from sqlalchemy.orm import Session
from app.models.label import Label


def create_label(
    db: Session,
    name: str,
    color: str,
    card_id: int
):
    label = Label(
        name=name,
        color=color,
        card_id=card_id
    )

    db.add(label)
    db.commit()
    db.refresh(label)

    return label


def get_labels(
    db: Session,
    card_id: int
):
    return (
        db.query(Label)
        .filter(
            Label.card_id == card_id
        )
        .all()
    )