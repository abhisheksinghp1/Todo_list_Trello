from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.auth import router as auth_router
from app.api.boards import router as board_router
from app.api.lists import router as list_router
from app.api.cards import router as card_router
from app.api.comments import router as comment_router
from app.api.websocket import router as websocket_router

from app.core.database import Base, engine

# Models import for create_all
from app.models.user import User
from app.models.board import Board
from app.models.list import List
from app.models.card import Card
from app.models.comment import Comment
from app.models.label import Label
from app.models.activity import Activity
from app.api.labels import (
    router as label_router
)
from app.models.member import Member

from app.api.checklists import (
    router as checklist_router
)
from app.api.members import (
    router as member_router
)
from app.api.activities import (
    router as activity_router
)

from app.api.attachments import (
    router as attachment_router
)

from app.models.attachment import Attachment


app = FastAPI(
    title="Trello Clone API"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(
    attachment_router
)

app.include_router(
    activity_router
)

app.include_router(
    member_router
)

app.include_router(
    label_router)

app.include_router(
    checklist_router
)

app.include_router(auth_router)
app.include_router(board_router)
app.include_router(list_router)
app.include_router(card_router)
app.include_router(comment_router)
app.include_router(websocket_router)


@app.get("/")
def root():
    return {
        "message": "API Running"
    }