from sqlalchemy.orm import Session

from app.models.comment import Comment


def create_comment(
    db: Session,
    card_id: int,
    user_id: int,
    message: str
):

    comment = Comment(
        card_id=card_id,
        user_id=user_id,
        message=message
    )

    db.add(comment)
    db.commit()
    db.refresh(comment)

    return comment


def get_comments(
    db: Session,
    card_id: int
):
    return (
        db.query(Comment)
        .filter(Comment.card_id == card_id)
        .all()
    )


def delete_comment(
    db: Session,
    comment_id: int
):
    comment = (
        db.query(Comment)
        .filter(Comment.id == comment_id)
        .first()
    )

    if comment:
        db.delete(comment)
        db.commit()

    return comment