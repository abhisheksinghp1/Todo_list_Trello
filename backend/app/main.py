# from fastapi import FastAPI

# app = FastAPI(
#     title="Trello Clone API",
#     version="1.0.0"
# )

# @app.get("/")
# def home():
#     return {
#         "message": "Trello Clone Backend Running"
#     }


from fastapi import FastAPI

from app.api.auth import router as auth_router

from app.core.database import Base
from app.core.database import engine

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Trello Clone API"
)

app.include_router(auth_router)


@app.get("/")
def root():
    return {
        "message": "API Running"
    }