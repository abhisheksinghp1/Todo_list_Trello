from sqlalchemy import Column, Integer, String, ForeignKey

from app.core.database import Base


class List(Base):
    __tablename__ = "lists"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String, nullable=False)

    board_id = Column(
        Integer,
        ForeignKey("boards.id"),
        nullable=False
    )

    position = Column(
        Integer,
        default=0
    )