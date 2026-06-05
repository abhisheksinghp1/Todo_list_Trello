from pydantic import BaseModel


class LabelCreate(BaseModel):
    name: str
    color: str
    card_id: int


class LabelResponse(BaseModel):
    id: int
    name: str
    color: str
    card_id: int

    class Config:
        from_attributes = True