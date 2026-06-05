from pydantic import BaseModel


class ChecklistCreate(BaseModel):

    title: str
    card_id: int


class ChecklistToggle(BaseModel):

    completed: bool