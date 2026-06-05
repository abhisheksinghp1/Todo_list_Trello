from sqlalchemy.orm import Session

from app.models.checklist import Checklist


def create_checklist(
    db: Session,
    title: str,
    card_id: int
):
    item = Checklist(
        title=title,
        card_id=card_id
    )

    db.add(item)
    db.commit()
    db.refresh(item)

    return item


def get_checklists(
    db: Session,
    card_id: int
):
    return (
        db.query(Checklist)
        .filter(
            Checklist.card_id == card_id
        )
        .all()
    )


def toggle_checklist(
    db: Session,
    checklist_id: int,
    completed: bool
):
    item = (
        db.query(Checklist)
        .filter(
            Checklist.id == checklist_id
        )
        .first()
    )

    if not item:
        return None

    item.completed = completed

    db.commit()
    db.refresh(item)

    return item


def delete_checklist(
    db: Session,
    checklist_id: int
):
    item = (
        db.query(Checklist)
        .filter(
            Checklist.id == checklist_id
        )
        .first()
    )

    if item:
        db.delete(item)
        db.commit()

    return item