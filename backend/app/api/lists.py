from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session

from app.schemas.list import ListCreate

from app.services.list_service import (
    create_list,
    get_lists
)

from app.core.database import get_db


router = APIRouter(
    prefix="/lists",
    tags=["Lists"]
)


@router.post("/")
def create_new_list(
    data: ListCreate,
    db: Session = Depends(get_db)
):
    return create_list(
        db,
        data.title,
        data.board_id
    )


@router.get("/{board_id}")
def get_board_lists(
    board_id: int,
    db: Session = Depends(get_db)
):
    return get_lists(
        db,
        board_id
    )