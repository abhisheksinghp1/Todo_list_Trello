from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    ForeignKey
)

from datetime import datetime

from app.core.database import Base


class Activity(Base):

    __tablename__ = "activities"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    card_id = Column(
        Integer,
        ForeignKey("cards.id")
    )

    message = Column(
        String,
        nullable=False
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )