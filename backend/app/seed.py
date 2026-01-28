from . import models

DEFAULT_ACCOUNTS = [
  {"name": "Primary Bank", "account_type": "bank"},
  {"name": "Credit Card", "account_type": "card"},
]

DEFAULT_CATEGORIES = [
  {"name": "Income", "kind": "income"},
  {"name": "Expense", "kind": "expense"},
  {"name": "Investments", "kind": "expense"},
  {"name": "Savings", "kind": "expense"},
  {"name": "Transfer In", "kind": "income"},
  {"name": "Card Payment", "kind": "expense"},
]


def seed_defaults(db, user_id: int):
  for payload in DEFAULT_ACCOUNTS:
    db.add(models.Account(user_id=user_id, **payload))
  for payload in DEFAULT_CATEGORIES:
    db.add(models.Category(user_id=user_id, **payload))
  db.commit()
