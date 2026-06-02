from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from app.schemas.comment import (
    CommentCreate
)

from app.services.comment_service import (
    create_comment,
    get_comments,
    delete_comment
)

from app.core.database import get_db
from app.core.security import get_current_user

from app.models.user import User


router = APIRouter(
    prefix="/comments",
    tags=["Comments"]
)


@router.post("/")
def add_comment(
    data: CommentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    return create_comment(
        db,
        data.card_id,
        current_user.id,
        data.message
    )


@router.get("/{card_id}")
def get_card_comments(
    card_id: int,
    db: Session = Depends(get_db)
):
    return get_comments(
        db,
        card_id
    )


@router.delete("/{comment_id}")
def remove_comment(
    comment_id: int,
    db: Session = Depends(get_db)
):

    comment = delete_comment(
        db,
        comment_id
    )

    if not comment:
        raise HTTPException(
            status_code=404,
            detail="Comment not found"
        )

    return {
        "message": "Comment deleted"
    }