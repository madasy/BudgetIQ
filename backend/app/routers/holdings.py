from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from .. import models, schemas
from ..auth import get_current_user, get_db

router = APIRouter(prefix="/holdings", tags=["holdings"])


@router.get("", response_model=list[schemas.HoldingOut])
def list_holdings(db: Session = Depends(get_db), user=Depends(get_current_user)):
  return db.query(models.Holding).filter(models.Holding.user_id == user.id).all()


@router.post("", response_model=schemas.HoldingOut)
def create_holding(payload: schemas.HoldingCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
  holding = models.Holding(user_id=user.id, **payload.dict())
  db.add(holding)
  db.commit()
  db.refresh(holding)
  return holding


@router.put("/{holding_id}", response_model=schemas.HoldingOut)
def update_holding(holding_id: int, payload: schemas.HoldingUpdate, db: Session = Depends(get_db), user=Depends(get_current_user)):
  holding = db.query(models.Holding).filter(models.Holding.user_id == user.id, models.Holding.id == holding_id).first()
  if not holding:
    raise HTTPException(status_code=404, detail="Holding not found")
  updates = payload.dict(exclude_unset=True)
  for key, value in updates.items():
    setattr(holding, key, value)
  db.commit()
  db.refresh(holding)
  return holding


@router.delete("/{holding_id}")
def delete_holding(holding_id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
  holding = db.query(models.Holding).filter(models.Holding.user_id == user.id, models.Holding.id == holding_id).first()
  if not holding:
    raise HTTPException(status_code=404, detail="Holding not found")
  db.delete(holding)
  db.commit()
  return {"status": "deleted"}
