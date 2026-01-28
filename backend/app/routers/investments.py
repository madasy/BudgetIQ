from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from .. import models, schemas
from ..auth import get_current_user, get_db

router = APIRouter(prefix="/investments", tags=["investments"])


@router.get("/lots", response_model=list[schemas.InvestmentLotOut])
def list_investment_lots(db: Session = Depends(get_db), user=Depends(get_current_user)):
  return (
    db.query(models.InvestmentLot)
    .filter(models.InvestmentLot.user_id == user.id)
    .order_by(models.InvestmentLot.trade_date.desc())
    .all()
  )
