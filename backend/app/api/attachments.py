from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.schemas.attachment import (
    AttachmentCreate
)

from app.services.attachment_service import (
    create_attachment,
    get_attachments,
    delete_attachment
)

router = APIRouter(
    prefix="/attachments",
    tags=["Attachments"]
)


@router.post("/")
def add_attachment(
    data: AttachmentCreate,
    db: Session = Depends(get_db)
):
    return create_attachment(
        db,
        data.filename,
        data.filepath,
        data.card_id
    )


@router.get("/{card_id}")
def card_attachments(
    card_id: int,
    db: Session = Depends(get_db)
):
    return get_attachments(
        db,
        card_id
    )


@router.delete("/{attachment_id}")
def remove_attachment(
    attachment_id: int,
    db: Session = Depends(get_db)
):

    attachment = delete_attachment(
        db,
        attachment_id
    )

    if not attachment:
        raise HTTPException(
            status_code=404,
            detail="Attachment not found"
        )

    return {
        "message": "Deleted"
    }