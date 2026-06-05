from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    ForeignKey
)

from app.core.database import Base


class Checklist(Base):

    __tablename__ = "checklists"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    title = Column(
        String,
        nullable=False
    )

    completed = Column(
        Boolean,
        default=False
    )

    card_id = Column(
        Integer,
        ForeignKey("cards.id")
    )