from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from .. import models, schemas
from ..auth import get_current_user, get_db

router = APIRouter(prefix="/transactions", tags=["transactions"])


@router.get("", response_model=list[schemas.TransactionOut])
def list_transactions(db: Session = Depends(get_db), user=Depends(get_current_user)):
  return (
    db.query(models.Transaction)
    .filter(models.Transaction.user_id == user.id)
    .order_by(models.Transaction.date.desc())
    .all()
  )


@router.post("", response_model=schemas.TransactionOut)
def create_transaction(payload: schemas.TransactionCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
  transaction = models.Transaction(user_id=user.id, **payload.dict())
  db.add(transaction)
  db.commit()
  db.refresh(transaction)
  return transaction


@router.put("/{transaction_id}", response_model=schemas.TransactionOut)
def update_transaction(
  transaction_id: int,
  payload: schemas.TransactionUpdate,
  db: Session = Depends(get_db),
  user=Depends(get_current_user),
):
  transaction = (
    db.query(models.Transaction)
    .filter(models.Transaction.user_id == user.id, models.Transaction.id == transaction_id)
    .first()
  )
  if not transaction:
    raise HTTPException(status_code=404, detail="Transaction not found")
  updates = payload.dict(exclude_unset=True)
  for key, value in updates.items():
    setattr(transaction, key, value)
  db.commit()
  db.refresh(transaction)
  return transaction


@router.delete("/{transaction_id}")
def delete_transaction(transaction_id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
  transaction = (
    db.query(models.Transaction)
    .filter(models.Transaction.user_id == user.id, models.Transaction.id == transaction_id)
    .first()
  )
  if not transaction:
    raise HTTPException(status_code=404, detail="Transaction not found")
  db.delete(transaction)
  db.commit()
  return {"status": "deleted"}


@router.delete("")
def delete_all_transactions(db: Session = Depends(get_db), user=Depends(get_current_user)):
  db.query(models.Transaction).filter(models.Transaction.user_id == user.id).delete()
  db.commit()
  return {"status": "deleted"}
