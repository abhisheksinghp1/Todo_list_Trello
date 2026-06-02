from sqlalchemy.orm import Session

from app.models.card import Card


def create_card(
    db: Session,
    title: str,
    description: str,
    list_id: int
):

    card = Card(
        title=title,
        description=description,
        list_id=list_id
    )

    db.add(card)
    db.commit()
    db.refresh(card)

    return card


def get_card(
    db: Session,
    card_id: int
):
    return (
        db.query(Card)
        .filter(Card.id == card_id)
        .first()
    )


def delete_card(
    db: Session,
    card_id: int
):
    card = get_card(db, card_id)

    if card:
        db.delete(card)
        db.commit()

    return card