from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    ForeignKey,
    DateTime
)

from app.core.database import Base


class Card(Base):
    __tablename__ = "cards"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    title = Column(
        String,
        nullable=False
    )

    description = Column(
        Text,
        nullable=True
    )

    list_id = Column(
        Integer,
        ForeignKey("lists.id"),
        nullable=False
    )

    position = Column(
        Integer,
        default=0
    )

    due_date = Column(
        DateTime,
        nullable=True
    )