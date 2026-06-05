from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.schemas.member import (
    MemberCreate
)

from app.services.member_service import (
    create_member,
    get_members,
    delete_member
)

router = APIRouter(
    prefix="/members",
    tags=["Members"]
)


@router.post("/")
def add_member(
    data: MemberCreate,
    db: Session = Depends(get_db)
):
    return create_member(
        db,
        data.user_id,
        data.card_id
    )


@router.get("/{card_id}")
def card_members(
    card_id: int,
    db: Session = Depends(get_db)
):
    return get_members(
        db,
        card_id
    )


@router.delete("/{member_id}")
def remove_member(
    member_id: int,
    db: Session = Depends(get_db)
):

    member = delete_member(
        db,
        member_id
    )

    if not member:
        raise HTTPException(
            status_code=404,
            detail="Member not found"
        )

    return {
        "message": "Member removed"
    }