from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from app.schemas.card import (
    CardCreate,
    MoveCardSchema,
    CardUpdate
)

from app.services.card_service import (
    create_card,
    get_card,
    delete_card,
    get_cards_by_list,
    move_card,
    update_card
)

from app.core.database import get_db
from app.websocket.manager import manager


router = APIRouter(
    prefix="/cards",
    tags=["Cards"]
)


@router.get("/list/{list_id}")
def get_list_cards(
    list_id: int,
    db: Session = Depends(get_db)
):
    return get_cards_by_list(
        db,
        list_id
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
    card = get_card(
        db,
        card_id
    )

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


@router.put("/{card_id}/move")
async def move_card_endpoint(
    card_id: int,
    payload: MoveCardSchema,
    db: Session = Depends(get_db)
):
    card = move_card(
        db,
        card_id,
        payload.list_id
    )

    if not card:
        raise HTTPException(
            status_code=404,
            detail="Card not found"
        )

    await manager.broadcast({
        "event": "card_moved",
        "card_id": card.id,
        "list_id": payload.list_id
    })

    return card


@router.put("/{card_id}")
async def update_card_endpoint(
    card_id: int,
    payload: CardUpdate,
    db: Session = Depends(get_db)
):

    card = update_card(
        db,
        card_id,
        payload.title,
        payload.description,
        payload.due_date
    )

    if not card:
        raise HTTPException(
            status_code=404,
            detail="Card not found"
        )

    await manager.broadcast({
        "event": "card_updated",
        "card_id": card.id
    })

    return card

