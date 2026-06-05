from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey
)

from app.core.database import Base


class Attachment(Base):

    __tablename__ = "attachments"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    filename = Column(
        String,
        nullable=False
    )

    filepath = Column(
        String,
        nullable=False
    )

    card_id = Column(
        Integer,
        ForeignKey("cards.id")
    )