from sqlalchemy.orm import Session

from app.models.board import Board


def create_board(
    db: Session,
    title: str,
    owner_id: int
):
    board = Board(
        title=title,
        owner_id=owner_id
    )

    db.add(board)
    db.commit()
    db.refresh(board)

    return board


def get_boards(
    db: Session,
    owner_id: int
):
    return (
        db.query(Board)
        .filter(Board.owner_id == owner_id)
        .all()
    )


def get_board_by_id(
    db: Session,
    board_id: int,
    owner_id: int
):
    return (
        db.query(Board)
        .filter(
            Board.id == board_id,
            Board.owner_id == owner_id
        )
        .first()
    )