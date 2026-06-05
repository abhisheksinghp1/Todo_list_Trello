from sqlalchemy.orm import Session
from app.models.card import Card


def move_card(
    db: Session,
    card_id: int,
    list_id: int
):
    card = (
        db.query(Card)
        .filter(Card.id == card_id)
        .first()
    )

    if not card:
        return None

    card.list_id = list_id

    db.commit()
    db.refresh(card)

    return card


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


def get_cards_by_list(
    db: Session,
    list_id: int
):
    return (
        db.query(Card)
        .filter(Card.list_id == list_id)
        .all()
    )

def update_card(
    db: Session,
    card_id: int,
    title: str,
    description: str,
    due_date
):
    card = (
        db.query(Card)
        .filter(Card.id == card_id)
        .first()
    )

    if not card:
        return None

    card.title = title
    card.description = description
    card.due_date = due_date

    db.commit()
    db.refresh(card)

    return card