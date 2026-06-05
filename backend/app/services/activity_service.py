from sqlalchemy.orm import Session

from app.models.activity import Activity


def create_activity(
    db: Session,
    card_id: int,
    message: str
):
    activity = Activity(
        card_id=card_id,
        message=message
    )

    db.add(activity)
    db.commit()
    db.refresh(activity)

    return activity


def get_activities(
    db: Session,
    card_id: int
):
    return (
        db.query(Activity)
        .filter(
            Activity.card_id == card_id
        )
        .order_by(
            Activity.id.desc()
        )
        .all()
    )