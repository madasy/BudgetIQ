from functools import lru_cache
from typing import Optional

import financedatabase as fd
import httpx
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from .. import models
from ..auth import get_current_user, get_db

router = APIRouter(prefix="/prices", tags=["prices"])


def build_symbol_candidates(symbol: str, currency: Optional[str]) -> list[str]:
  symbol = symbol.strip().upper()
  if "." in symbol:
    return [symbol]
  if currency and currency.upper() == "CHF":
    return [f"{symbol}.SW", symbol]
  return [symbol]


def fetch_yahoo_price(symbol: str) -> Optional[float]:
  url = "https://query1.finance.yahoo.com/v7/finance/quote"
  try:
    response = httpx.get(url, params={"symbols": symbol}, timeout=10)
    response.raise_for_status()
    payload = response.json()
    quote = payload.get("quoteResponse", {}).get("result", [])
    if not quote:
      return None
    price = quote[0].get("regularMarketPrice")
    return float(price) if price is not None else None
  except Exception:
    return None


@lru_cache(maxsize=1)
def load_finance_database():
  equities = fd.Equities().select()
  etfs = fd.ETFs().select()
  return equities, etfs


def fetch_financedatabase_price(symbol: str) -> Optional[float]:
  try:
    equities, etfs = load_finance_database()
  except Exception:
    return None

  for dataset in (equities, etfs):
    if dataset is None:
      continue
    if symbol in dataset.index:
      row = dataset.loc[symbol]
    else:
      continue
    for column in ("price", "last", "close", "market_price", "regularMarketPrice"):
      if column in row and row[column] is not None:
        return float(row[column])
  return None


@router.post("/refresh")
def refresh_prices(db: Session = Depends(get_db), user=Depends(get_current_user)):
  holdings = db.query(models.Holding).filter(models.Holding.user_id == user.id).all()
  if not holdings:
    return {"updated": 0, "failed": 0}

  updated = 0
  failed = 0
  for holding in holdings:
    candidates = build_symbol_candidates(holding.symbol, holding.currency)
    price = fetch_financedatabase_price(holding.symbol)
    for candidate in candidates:
      if price is None:
        price = fetch_yahoo_price(candidate)
      if price is not None:
        break
    if price is None:
      failed += 1
      continue
    holding.current_price = price
    holding.last_price = price
    updated += 1

  db.commit()
  return {"updated": updated, "failed": failed}
