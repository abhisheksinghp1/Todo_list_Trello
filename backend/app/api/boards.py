from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.schemas.board import (
    BoardCreate,
)

from app.services.board_service import (
    create_board,
    get_boards,
    get_board_by_id,
)

from app.core.database import get_db
from app.core.security import get_current_user

from app.models.user import User


router = APIRouter(
    prefix="/boards",
    tags=["Boards"]
)


@router.post("/")
def create_new_board(
    board: BoardCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return create_board(
        db,
        board.title,
        current_user.id
    )


@router.get("/")
def get_all_boards(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return get_boards(
        db,
        current_user.id
    )


@router.get("/{board_id}")
def get_single_board(
    board_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    board = get_board_by_id(
        db,
        board_id,
        current_user.id
    )

    if not board:
        raise HTTPException(
            status_code=404,
            detail="Board not found"
        )

    return board