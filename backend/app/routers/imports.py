from decimal import Decimal
from fastapi import APIRouter, Depends, File, HTTPException, UploadFile
from sqlalchemy.orm import Session

from .. import models, schemas
from ..auth import get_current_user, get_db
from ..services.importers import parse_migros_csv, parse_yuh_csv

router = APIRouter(prefix="/imports", tags=["imports"])


def require_category(db: Session, user_id: int, name: str) -> models.Category:
  category = (
    db.query(models.Category)
    .filter(models.Category.user_id == user_id, models.Category.name == name)
    .first()
  )
  if not category:
    raise HTTPException(status_code=400, detail=f"Missing category: {name}")
  return category


def update_holding_average_cost(
  db: Session,
  user_id: int,
  symbol: str,
  name: str,
  side: str,
  quantity: Decimal,
  price_per_unit: Decimal,
  fee_amount: Decimal,
  currency: str,
):
  holding = (
    db.query(models.Holding)
    .filter(models.Holding.user_id == user_id, models.Holding.symbol == symbol)
    .first()
  )
  total_cost = quantity * price_per_unit + fee_amount
  if holding is None:
    if side.upper() == "SELL":
      return 0
    holding = models.Holding(
      user_id=user_id,
      symbol=symbol,
      name=name,
      quantity=quantity,
      avg_cost=total_cost / quantity,
      current_price=price_per_unit,
      last_price=price_per_unit,
      currency=currency,
    )
    db.add(holding)
    db.commit()
    return 1

  if side.upper() == "SELL":
    holding.quantity = max(Decimal("0"), holding.quantity - quantity)
    holding.last_price = price_per_unit
    db.commit()
    return 1

  existing_cost = holding.quantity * holding.avg_cost
  combined_quantity = holding.quantity + quantity
  if combined_quantity:
    holding.avg_cost = (existing_cost + total_cost) / combined_quantity
  holding.quantity = combined_quantity
  holding.last_price = price_per_unit
  if holding.current_price is None:
    holding.current_price = price_per_unit
  if not holding.name:
    holding.name = name
  if not holding.currency:
    holding.currency = currency
  db.commit()
  return 1


@router.post("/migros", response_model=schemas.ImportSummary)
def import_migros(
  account_id: int,
  file: UploadFile = File(...),
  db: Session = Depends(get_db),
  user=Depends(get_current_user),
):
  account = (
    db.query(models.Account)
    .filter(models.Account.user_id == user.id, models.Account.id == account_id)
    .first()
  )
  if not account:
    raise HTTPException(status_code=404, detail="Account not found")
  contents = file.file.read().decode("utf-8", errors="ignore")
  rows = parse_migros_csv(contents)
  income_category = require_category(db, user.id, "Income")
  expense_category = require_category(db, user.id, "Expense")
  added = 0
  for row in rows:
    category_id = income_category.id if row["type"] == "income" else expense_category.id
    tx = models.Transaction(
      user_id=user.id,
      account_id=account_id,
      category_id=category_id,
      type=row["type"],
      amount=row["amount"],
      currency=row["currency"],
      date=row["date"],
      note=row["description"],
    )
    db.add(tx)
    added += 1
  db.commit()
  return schemas.ImportSummary(transactions_added=added, holdings_updated=0, investment_lots_added=0)


@router.post("/yuh", response_model=schemas.ImportSummary)
def import_yuh(
  account_id: int,
  file: UploadFile = File(...),
  db: Session = Depends(get_db),
  user=Depends(get_current_user),
):
  account = (
    db.query(models.Account)
    .filter(models.Account.user_id == user.id, models.Account.id == account_id)
    .first()
  )
  if not account:
    raise HTTPException(status_code=404, detail="Account not found")
  contents = file.file.read().decode("utf-8", errors="ignore")
  parsed = parse_yuh_csv(contents)
  rows = parsed["rows"]
  lots = parsed["lots"]

  investments_category = require_category(db, user.id, "Investments")
  savings_category = require_category(db, user.id, "Savings")
  transfer_category = require_category(db, user.id, "Transfer In")
  card_category = require_category(db, user.id, "Card Payment")

  added = 0
  holdings_updated = 0
  lots_added = 0

  for row in rows:
    if row["activity_type"] in ("INVEST_ORDER_EXECUTED", "INVEST_RECURRING_ORDER_EXECUTED"):
      category_id = investments_category.id
    elif row["activity_type"] == "GOAL_AUTO_DEPOSIT":
      category_id = savings_category.id
    elif row["activity_type"] == "PAYMENT_TRANSACTION_IN":
      category_id = transfer_category.id
    elif row["activity_type"] == "CARD_TRANSACTION_OUT":
      category_id = card_category.id
    else:
      category_id = investments_category.id if row["type"] == "expense" else transfer_category.id

    tx = models.Transaction(
      user_id=user.id,
      account_id=account_id,
      category_id=category_id,
      type=row["type"],
      amount=row["amount"],
      currency=row["currency"],
      date=row["date"],
      note=row["description"],
    )
    db.add(tx)
    added += 1

  for lot in lots:
    db.add(
      models.InvestmentLot(
        user_id=user.id,
        symbol=lot["asset"],
        name=lot["name"],
        activity_type=lot["activity_type"],
        side=lot["side"],
        quantity=lot["quantity"],
        price_per_unit=lot["price_per_unit"],
        fee_amount=lot["fee_amount"],
        total_amount=lot["total_amount"],
        currency=lot["currency"],
        trade_date=lot["date"],
        note=lot["name"],
      )
    )
    lots_added += 1
    holdings_updated += update_holding_average_cost(
      db=db,
      user_id=user.id,
      symbol=lot["asset"],
      name=lot["name"],
      side=lot["side"],
      quantity=lot["quantity"],
      price_per_unit=lot["price_per_unit"],
      fee_amount=lot["fee_amount"],
      currency=lot["currency"],
    )

  db.commit()
  return schemas.ImportSummary(
    transactions_added=added,
    holdings_updated=holdings_updated,
    investment_lots_added=lots_added,
  )
