from pydantic import BaseModel


class AttachmentCreate(
    BaseModel
):

    filename: str
    filepath: str
    card_id: int