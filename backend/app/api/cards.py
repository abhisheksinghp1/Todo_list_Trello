from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from app.schemas.card import CardCreate
from app.services.card_service import (
    create_card,
    get_card,
    delete_card
)

from app.core.database import get_db
from app.websocket.manager import manager

router = APIRouter(
    prefix="/cards",
    tags=["Cards"]
)


@router.post("/")
async def create_new_card(
    data: CardCreate,
    db: Session = Depends(get_db)
):
    card = create_card(
        db,
        data.title,
        data.description,
        data.list_id
    )

    await manager.broadcast({
        "event": "card_created",
        "card_id": card.id,
        "title": card.title
    })

    return card


@router.get("/{card_id}")
def get_single_card(
    card_id: int,
    db: Session = Depends(get_db)
):
    card = get_card(db, card_id)

    if not card:
        raise HTTPException(
            status_code=404,
            detail="Card not found"
        )

    return card


@router.delete("/{card_id}")
async def remove_card(
    card_id: int,
    db: Session = Depends(get_db)
):
    card = delete_card(
        db,
        card_id
    )

    if not card:
        raise HTTPException(
            status_code=404,
            detail="Card not found"
        )

    await manager.broadcast({
        "event": "card_deleted",
        "card_id": card_id
    })

    return {
        "message": "Card deleted"
    }