from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload

from .. import models, schemas
from ..auth import get_current_user, get_db

router = APIRouter(prefix="/budget-plan", tags=["budget-plan"])


def get_or_create_current_plan(db: Session, user: models.User) -> models.BudgetPlan:
  plan = (
    db.query(models.BudgetPlan)
    .filter(models.BudgetPlan.user_id == user.id, models.BudgetPlan.is_current.is_(True))
    .order_by(models.BudgetPlan.id.desc())
    .first()
  )
  if plan:
    return plan
  plan = models.BudgetPlan(user_id=user.id, name="Current Plan", is_current=True)
  db.add(plan)
  db.commit()
  db.refresh(plan)
  return plan


@router.get("/current", response_model=schemas.BudgetPlanOut)
def get_current_plan(db: Session = Depends(get_db), user=Depends(get_current_user)):
  plan = get_or_create_current_plan(db, user)
  plan = (
    db.query(models.BudgetPlan)
    .options(joinedload(models.BudgetPlan.items).joinedload(models.BudgetItem.category))
    .filter(models.BudgetPlan.id == plan.id)
    .first()
  )
  if not plan:
    raise HTTPException(status_code=404, detail="Plan not found")
  return schemas.BudgetPlanOut(
    id=plan.id,
    name=plan.name,
    is_current=plan.is_current,
    base_currency=user.base_currency,
    items=plan.items,
  )


@router.post("/items", response_model=schemas.BudgetItemOut)
def create_budget_item(payload: schemas.BudgetItemCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
  plan = get_or_create_current_plan(db, user)
  category = db.query(models.Category).filter(models.Category.user_id == user.id, models.Category.id == payload.category_id).first()
  if not category:
    raise HTTPException(status_code=404, detail="Category not found")
  parent_item_id = payload.parent_item_id
  if parent_item_id:
    parent = db.query(models.BudgetItem).filter(models.BudgetItem.plan_id == plan.id, models.BudgetItem.id == parent_item_id).first()
    if not parent:
      raise HTTPException(status_code=404, detail="Parent item not found")
  item = models.BudgetItem(
    plan_id=plan.id,
    category_id=payload.category_id,
    kind=payload.kind,
    amount=payload.amount,
    gross_amount=payload.gross_amount,
    net_amount=payload.net_amount,
    currency=payload.currency or user.base_currency,
    group_name=payload.group_name,
    position=payload.position,
    parent_item_id=payload.parent_item_id,
  )
  db.add(item)
  db.commit()
  db.refresh(item)
  return item


@router.put("/items/{item_id}", response_model=schemas.BudgetItemOut)
def update_budget_item(item_id: int, payload: schemas.BudgetItemUpdate, db: Session = Depends(get_db), user=Depends(get_current_user)):
  plan = get_or_create_current_plan(db, user)
  item = db.query(models.BudgetItem).filter(models.BudgetItem.plan_id == plan.id, models.BudgetItem.id == item_id).first()
  if not item:
    raise HTTPException(status_code=404, detail="Item not found")
  if payload.category_id is not None:
    category = db.query(models.Category).filter(models.Category.user_id == user.id, models.Category.id == payload.category_id).first()
    if not category:
      raise HTTPException(status_code=404, detail="Category not found")
    item.category_id = payload.category_id
  if payload.parent_item_id is not None:
    if payload.parent_item_id == item.id:
      raise HTTPException(status_code=400, detail="Item cannot be its own parent")
    if payload.parent_item_id:
      parent = db.query(models.BudgetItem).filter(models.BudgetItem.plan_id == plan.id, models.BudgetItem.id == payload.parent_item_id).first()
      if not parent:
        raise HTTPException(status_code=404, detail="Parent item not found")
    item.parent_item_id = payload.parent_item_id
  if payload.kind is not None:
    item.kind = payload.kind
  if payload.amount is not None:
    item.amount = payload.amount
  if payload.gross_amount is not None:
    item.gross_amount = payload.gross_amount
  if payload.net_amount is not None:
    item.net_amount = payload.net_amount
  if payload.currency is not None:
    item.currency = payload.currency
  if payload.group_name is not None:
    item.group_name = payload.group_name
  if payload.position is not None:
    item.position = payload.position
  db.commit()
  db.refresh(item)
  return item


@router.delete("/items/{item_id}")
def delete_budget_item(item_id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
  plan = get_or_create_current_plan(db, user)
  item = db.query(models.BudgetItem).filter(models.BudgetItem.plan_id == plan.id, models.BudgetItem.id == item_id).first()
  if not item:
    raise HTTPException(status_code=404, detail="Item not found")
  db.delete(item)
  db.commit()
  return {"status": "deleted"}
