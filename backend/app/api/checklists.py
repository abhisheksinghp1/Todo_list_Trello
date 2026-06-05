from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.schemas.checklist import (
    ChecklistCreate,
    ChecklistToggle
)

from app.services.checklist_service import (
    create_checklist,
    get_checklists,
    toggle_checklist,
    delete_checklist
)

router = APIRouter(
    prefix="/checklists",
    tags=["Checklists"]
)


@router.post("/")
def create_new_checklist(
    data: ChecklistCreate,
    db: Session = Depends(get_db)
):
    return create_checklist(
        db,
        data.title,
        data.card_id
    )


@router.get("/{card_id}")
def get_card_checklists(
    card_id: int,
    db: Session = Depends(get_db)
):
    return get_checklists(
        db,
        card_id
    )


@router.put("/{checklist_id}")
def toggle_checklist_endpoint(
    checklist_id: int,
    data: ChecklistToggle,
    db: Session = Depends(get_db)
):
    item = toggle_checklist(
        db,
        checklist_id,
        data.completed
    )

    if not item:
        raise HTTPException(
            status_code=404,
            detail="Checklist not found"
        )

    return item


@router.delete("/{checklist_id}")
def delete_checklist_endpoint(
    checklist_id: int,
    db: Session = Depends(get_db)
):
    item = delete_checklist(
        db,
        checklist_id
    )

    if not item:
        raise HTTPException(
            status_code=404,
            detail="Checklist not found"
        )

    return {
        "message": "Deleted"
    }