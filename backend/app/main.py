from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routers import auth, accounts, categories, transactions, holdings, investments, imports, prices, budget_plan

app = FastAPI(title="BudgetIQ API")

app.add_middleware(
  CORSMiddleware,
  allow_origins=["http://localhost:5173"],
  allow_credentials=True,
  allow_methods=["*"] ,
  allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(accounts.router)
app.include_router(categories.router)
app.include_router(transactions.router)
app.include_router(holdings.router)
app.include_router(investments.router)
app.include_router(imports.router)
app.include_router(prices.router)
app.include_router(budget_plan.router)
