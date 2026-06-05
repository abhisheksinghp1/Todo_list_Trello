from pydantic import BaseModel


class ActivityCreate(
    BaseModel
):

    card_id: int
    message: str