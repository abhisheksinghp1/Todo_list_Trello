from sqlalchemy.orm import Session

from app.models.member import Member


def create_member(
    db: Session,
    user_id: int,
    card_id: int
):
    member = Member(
        user_id=user_id,
        card_id=card_id
    )

    db.add(member)
    db.commit()
    db.refresh(member)

    return member


def get_members(
    db: Session,
    card_id: int
):
    return (
        db.query(Member)
        .filter(
            Member.card_id == card_id
        )
        .all()
    )


def delete_member(
    db: Session,
    member_id: int
):
    member = (
        db.query(Member)
        .filter(
            Member.id == member_id
        )
        .first()
    )

    if member:
        db.delete(member)
        db.commit()

    return member