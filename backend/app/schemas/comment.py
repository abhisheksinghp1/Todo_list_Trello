from pydantic import BaseModel


class CommentCreate(BaseModel):
    card_id: int
    message: str


class CommentResponse(BaseModel):
    id: int
    card_id: int
    user_id: int
    message: str

    class Config:
        from_attributes = True