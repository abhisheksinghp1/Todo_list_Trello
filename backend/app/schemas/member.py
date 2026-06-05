from pydantic import BaseModel


class MemberCreate(BaseModel):

    user_id: int
    card_id: int