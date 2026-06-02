from pydantic import BaseModel


class BoardCreate(BaseModel):
    title: str


class BoardUpdate(BaseModel):
    title: str


class BoardResponse(BaseModel):
    id: int
    title: str
    owner_id: int

    class Config:
        from_attributes = True