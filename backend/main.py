# # from fastapi import FastAPI

# # app = FastAPI(
# #     title="Trello Clone API",
# #     version="1.0.0"
# # )

# # @app.get("/")
# # def home():
# #     return {
# #         "message": "Trello Clone Backend Running"
# #     }


# from fastapi import FastAPI

# from app.api.auth import router as auth_router

# from app.core.database import Base
# from app.core.database import engine
# from app.api.boards import router as board_router
# from app.models.user import User
# from app.models.board import Board
# from app.api.lists import router as list_router
# from app.models.list import List
# from app.api.cards import router as card_router
# from app.models.card import Card
# from app.api.comments import router as comment_router
# from app.models.comment import Comment
# from app.api.websocket import (
#     router as websocket_router
# )


# app.include_router(
#     websocket_router
# )

# app.include_router(comment_router)

# app.include_router(card_router)

# app.include_router(list_router)

# app.include_router(board_router)

# Base.metadata.create_all(bind=engine)

# app = FastAPI(
#     title="Trello Clone API"
# )

# app.include_router(auth_router)


# @app.get("/")
# def root():
#     return {
#         "message": "API Running"
#     }




from fastapi import FastAPI

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