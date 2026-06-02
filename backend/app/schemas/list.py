from pydantic import BaseModel


class ListCreate(BaseModel):
    title: str
    board_id: int


class ListUpdate(BaseModel):
    title: str


class ListResponse(BaseModel):
    id: int
    title: str
    board_id: int
    position: int

    class Config:
        from_attributes = True