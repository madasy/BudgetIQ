from sqlalchemy import Boolean, Column, Date, DateTime, ForeignKey, Integer, Numeric, String, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from .db import Base


class User(Base):
  __tablename__ = "users"

  id = Column(Integer, primary_key=True, index=True)
  email = Column(String(255), unique=True, nullable=False, index=True)
  hashed_password = Column(String(255), nullable=False)
  base_currency = Column(String(8), nullable=False, default="CHF")
  is_active = Column(Boolean, default=True)
  created_at = Column(DateTime(timezone=True), server_default=func.now())

  accounts = relationship("Account", back_populates="user", cascade="all, delete-orphan")
  categories = relationship("Category", back_populates="user", cascade="all, delete-orphan")
  transactions = relationship("Transaction", back_populates="user", cascade="all, delete-orphan")
  holdings = relationship("Holding", back_populates="user", cascade="all, delete-orphan")
  investment_lots = relationship("InvestmentLot", back_populates="user", cascade="all, delete-orphan")


class Account(Base):
  __tablename__ = "accounts"

  id = Column(Integer, primary_key=True, index=True)
  user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
  name = Column(String(255), nullable=False)
  account_type = Column(String(64), nullable=True)
  created_at = Column(DateTime(timezone=True), server_default=func.now())

  user = relationship("User", back_populates="accounts")
  transactions = relationship("Transaction", back_populates="account")


class Category(Base):
  __tablename__ = "categories"

  id = Column(Integer, primary_key=True, index=True)
  user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
  name = Column(String(255), nullable=False)
  kind = Column(String(32), nullable=True)
  created_at = Column(DateTime(timezone=True), server_default=func.now())

  user = relationship("User", back_populates="categories")
  transactions = relationship("Transaction", back_populates="category")


class Transaction(Base):
  __tablename__ = "transactions"

  id = Column(Integer, primary_key=True, index=True)
  user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
  account_id = Column(Integer, ForeignKey("accounts.id"), nullable=False)
  category_id = Column(Integer, ForeignKey("categories.id"), nullable=True)
  type = Column(String(16), nullable=False)
  amount = Column(Numeric(12, 2), nullable=False)
  currency = Column(String(8), nullable=False, default="CHF")
  date = Column(Date, nullable=False)
  note = Column(Text, nullable=True)
  created_at = Column(DateTime(timezone=True), server_default=func.now())

  user = relationship("User", back_populates="transactions")
  account = relationship("Account", back_populates="transactions")
  category = relationship("Category", back_populates="transactions")


class Holding(Base):
  __tablename__ = "holdings"

  id = Column(Integer, primary_key=True, index=True)
  user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
  symbol = Column(String(32), nullable=False)
  name = Column(String(255), nullable=True)
  quantity = Column(Numeric(18, 6), nullable=False, default=0)
  avg_cost = Column(Numeric(18, 6), nullable=False, default=0)
  current_price = Column(Numeric(18, 6), nullable=True)
  last_price = Column(Numeric(18, 6), nullable=True)
  currency = Column(String(8), nullable=False, default="CHF")
  updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

  user = relationship("User", back_populates="holdings")


class InvestmentLot(Base):
  __tablename__ = "investment_lots"

  id = Column(Integer, primary_key=True, index=True)
  user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
  symbol = Column(String(32), nullable=False)
  name = Column(String(255), nullable=True)
  activity_type = Column(String(64), nullable=False)
  side = Column(String(8), nullable=False)
  quantity = Column(Numeric(18, 6), nullable=False)
  price_per_unit = Column(Numeric(18, 6), nullable=False)
  fee_amount = Column(Numeric(18, 6), nullable=True)
  total_amount = Column(Numeric(18, 6), nullable=False)
  currency = Column(String(8), nullable=False, default="CHF")
  trade_date = Column(Date, nullable=False)
  note = Column(Text, nullable=True)
  created_at = Column(DateTime(timezone=True), server_default=func.now())

  user = relationship("User", back_populates="investment_lots")
