from datetime import date, datetime
from decimal import Decimal
from typing import List, Optional

from pydantic import BaseModel, EmailStr


class Token(BaseModel):
  access_token: str
  token_type: str = "bearer"


class UserCreate(BaseModel):
  email: EmailStr
  password: str


class UserOut(BaseModel):
  id: int
  email: EmailStr
  base_currency: str

  class Config:
    orm_mode = True


class AccountBase(BaseModel):
  name: str
  account_type: Optional[str] = None


class AccountCreate(AccountBase):
  pass


class AccountUpdate(AccountBase):
  pass


class AccountOut(AccountBase):
  id: int

  class Config:
    orm_mode = True


class CategoryBase(BaseModel):
  name: str
  kind: Optional[str] = None


class CategoryCreate(CategoryBase):
  pass


class CategoryUpdate(CategoryBase):
  pass


class CategoryOut(CategoryBase):
  id: int

  class Config:
    orm_mode = True


class TransactionBase(BaseModel):
  account_id: int
  category_id: Optional[int] = None
  type: str
  amount: Decimal
  currency: str = "CHF"
  date: date
  note: Optional[str] = None


class TransactionCreate(TransactionBase):
  pass


class TransactionUpdate(BaseModel):
  account_id: Optional[int] = None
  category_id: Optional[int] = None
  type: Optional[str] = None
  amount: Optional[Decimal] = None
  currency: Optional[str] = None
  date: Optional[date] = None
  note: Optional[str] = None


class TransactionOut(TransactionBase):
  id: int

  class Config:
    orm_mode = True


class HoldingBase(BaseModel):
  symbol: str
  name: Optional[str] = None
  quantity: Decimal
  avg_cost: Decimal
  current_price: Optional[Decimal] = None
  last_price: Optional[Decimal] = None
  currency: str = "CHF"


class HoldingCreate(HoldingBase):
  pass


class HoldingUpdate(BaseModel):
  name: Optional[str] = None
  quantity: Optional[Decimal] = None
  avg_cost: Optional[Decimal] = None
  current_price: Optional[Decimal] = None
  last_price: Optional[Decimal] = None
  currency: Optional[str] = None


class HoldingOut(HoldingBase):
  id: int

  class Config:
    orm_mode = True


class InvestmentLotBase(BaseModel):
  symbol: str
  name: Optional[str] = None
  activity_type: str
  side: str
  quantity: Decimal
  price_per_unit: Decimal
  fee_amount: Optional[Decimal] = None
  total_amount: Decimal
  currency: str = "CHF"
  trade_date: date
  note: Optional[str] = None


class InvestmentLotOut(InvestmentLotBase):
  id: int

  class Config:
    orm_mode = True


class BudgetItemBase(BaseModel):
  category_id: int
  kind: str
  amount: Decimal
  gross_amount: Optional[Decimal] = None
  net_amount: Optional[Decimal] = None
  currency: str = "CHF"
  group_name: Optional[str] = None
  position: Optional[int] = None
  parent_item_id: Optional[int] = None


class BudgetItemCreate(BudgetItemBase):
  pass


class BudgetItemUpdate(BaseModel):
  category_id: Optional[int] = None
  kind: Optional[str] = None
  amount: Optional[Decimal] = None
  gross_amount: Optional[Decimal] = None
  net_amount: Optional[Decimal] = None
  currency: Optional[str] = None
  group_name: Optional[str] = None
  position: Optional[int] = None
  parent_item_id: Optional[int] = None


class BudgetItemOut(BudgetItemBase):
  id: int
  category: Optional[CategoryOut] = None

  class Config:
    orm_mode = True


class BudgetPlanOut(BaseModel):
  id: int
  name: Optional[str] = None
  is_current: bool
  base_currency: str
  items: List[BudgetItemOut]

  class Config:
    orm_mode = True


class ImportSummary(BaseModel):
  transactions_added: int
  holdings_updated: int
  investment_lots_added: int


class ErrorMessage(BaseModel):
  detail: str
