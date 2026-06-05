from sqlalchemy.orm import Session

from app.models.attachment import Attachment


def create_attachment(
    db: Session,
    filename: str,
    filepath: str,
    card_id: int
):
    attachment = Attachment(
        filename=filename,
        filepath=filepath,
        card_id=card_id
    )

    db.add(attachment)
    db.commit()
    db.refresh(attachment)

    return attachment


def get_attachments(
    db: Session,
    card_id: int
):
    return (
        db.query(Attachment)
        .filter(
            Attachment.card_id == card_id
        )
        .all()
    )


def delete_attachment(
    db: Session,
    attachment_id: int
):
    attachment = (
        db.query(Attachment)
        .filter(
            Attachment.id == attachment_id
        )
        .first()
    )

    if attachment:
        db.delete(attachment)
        db.commit()

    return attachment