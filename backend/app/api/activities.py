from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.schemas.activity import (
    ActivityCreate
)

from app.services.activity_service import (
    create_activity,
    get_activities
)

router = APIRouter(
    prefix="/activities",
    tags=["Activities"]
)


@router.post("/")
def add_activity(
    data: ActivityCreate,
    db: Session = Depends(get_db)
):
    return create_activity(
        db,
        data.card_id,
        data.message
    )


@router.get("/{card_id}")
def card_activities(
    card_id: int,
    db: Session = Depends(get_db)
):
    return get_activities(
        db,
        card_id
    )