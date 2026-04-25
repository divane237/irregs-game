from fastapi import APIRouter
from app.api.routes import game

api_router = APIRouter()

# Only include game routes (no leaderboard yet)
api_router.include_router(game.router, prefix="/game", tags=["game"])