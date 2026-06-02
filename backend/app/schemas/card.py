from pydantic import BaseModel
from datetime import datetime


class CardCreate(BaseModel):
    title: str
    description: str | None = None
    list_id: int


class CardUpdate(BaseModel):
    title: str
    description: str | None = None
    list_id: int


class CardResponse(BaseModel):
    id: int
    title: str
    description: str | None
    list_id: int
    position: int

    class Config:
        from_attributes = True