from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from .. import models, schemas
from ..auth import get_current_user, get_db

router = APIRouter(prefix="/categories", tags=["categories"])


@router.get("", response_model=list[schemas.CategoryOut])
def list_categories(db: Session = Depends(get_db), user=Depends(get_current_user)):
  return db.query(models.Category).filter(models.Category.user_id == user.id).all()


@router.post("", response_model=schemas.CategoryOut)
def create_category(payload: schemas.CategoryCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
  category = models.Category(user_id=user.id, name=payload.name, kind=payload.kind)
  db.add(category)
  db.commit()
  db.refresh(category)
  return category


@router.put("/{category_id}", response_model=schemas.CategoryOut)
def update_category(category_id: int, payload: schemas.CategoryUpdate, db: Session = Depends(get_db), user=Depends(get_current_user)):
  category = db.query(models.Category).filter(models.Category.user_id == user.id, models.Category.id == category_id).first()
  if not category:
    raise HTTPException(status_code=404, detail="Category not found")
  category.name = payload.name
  category.kind = payload.kind
  db.commit()
  db.refresh(category)
  return category


@router.delete("/{category_id}")
def delete_category(category_id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
  category = db.query(models.Category).filter(models.Category.user_id == user.id, models.Category.id == category_id).first()
  if not category:
    raise HTTPException(status_code=404, detail="Category not found")
  db.delete(category)
  db.commit()
  return {"status": "deleted"}
