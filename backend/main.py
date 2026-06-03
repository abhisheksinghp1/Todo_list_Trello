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