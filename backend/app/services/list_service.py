from sqlalchemy.orm import Session

from app.models.list import List


def create_list(
    db: Session,
    title: str,
    board_id: int
):
    new_list = List(
        title=title,
        board_id=board_id
    )

    db.add(new_list)
    db.commit()
    db.refresh(new_list)

    return new_list


def get_lists(
    db: Session,
    board_id: int
):
    return (
        db.query(List)
        .filter(List.board_id == board_id)
        .order_by(List.position)
        .all()
    )