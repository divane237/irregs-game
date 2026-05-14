from fastapi import APIRouter
from app.api.routes import game, leaderboard
api_router = APIRouter()

# Only include game routes (no leaderboard yet)
api_router.include_router(game.router, prefix="/game", tags=["game"])
api_router.include_router(leaderboard.router, prefix="/leaderboard", tags=["leaderboard"])
