from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.schemas.label import (
    LabelCreate
)

from app.services.label_service import (
    create_label,
    get_labels
)

router = APIRouter(
    prefix="/labels",
    tags=["Labels"]
)


@router.post("/")
def create_new_label(
    data: LabelCreate,
    db: Session = Depends(get_db)
):
    return create_label(
        db,
        data.name,
        data.color,
        data.card_id
    )


@router.get("/{card_id}")
def get_card_labels(
    card_id: int,
    db: Session = Depends(get_db)
):
    return get_labels(
        db,
        card_id
    )