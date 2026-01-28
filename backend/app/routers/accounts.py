from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from .. import models, schemas
from ..auth import get_current_user, get_db

router = APIRouter(prefix="/accounts", tags=["accounts"])


@router.get("", response_model=list[schemas.AccountOut])
def list_accounts(db: Session = Depends(get_db), user=Depends(get_current_user)):
  return db.query(models.Account).filter(models.Account.user_id == user.id).all()


@router.post("", response_model=schemas.AccountOut)
def create_account(payload: schemas.AccountCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
  account = models.Account(user_id=user.id, name=payload.name, account_type=payload.account_type)
  db.add(account)
  db.commit()
  db.refresh(account)
  return account


@router.put("/{account_id}", response_model=schemas.AccountOut)
def update_account(account_id: int, payload: schemas.AccountUpdate, db: Session = Depends(get_db), user=Depends(get_current_user)):
  account = db.query(models.Account).filter(models.Account.user_id == user.id, models.Account.id == account_id).first()
  if not account:
    raise HTTPException(status_code=404, detail="Account not found")
  account.name = payload.name
  account.account_type = payload.account_type
  db.commit()
  db.refresh(account)
  return account


@router.delete("/{account_id}")
def delete_account(account_id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
  account = db.query(models.Account).filter(models.Account.user_id == user.id, models.Account.id == account_id).first()
  if not account:
    raise HTTPException(status_code=404, detail="Account not found")
  db.delete(account)
  db.commit()
  return {"status": "deleted"}
