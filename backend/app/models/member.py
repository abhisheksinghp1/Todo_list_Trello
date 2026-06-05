from sqlalchemy import (
    Column,
    Integer,
    ForeignKey
)

from app.core.database import Base


class Member(Base):

    __tablename__ = "members"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    card_id = Column(
        Integer,
        ForeignKey("cards.id")
    )