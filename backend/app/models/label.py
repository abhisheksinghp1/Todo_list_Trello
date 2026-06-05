from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey
)

from app.core.database import Base


class Label(Base):
    __tablename__ = "labels"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(
        String,
        nullable=False
    )

    color = Column(
        String,
        nullable=False
    )

    card_id = Column(
        Integer,
        ForeignKey("cards.id")
    )