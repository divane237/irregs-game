from fastapi import APIRouter, Body
from app.schemas.game import (
    GameStartRequest, GameStartResponse,
    GameEndRequest, GameEndResponse,
    CheckAnswerResponse, CitiesResponse, RandomCodeResponse
)

from app.services.game_service import game_service
from app.utils.logic import get_destination, get_random_code, get_cities

router = APIRouter()

@router.post("/start", response_model=GameStartResponse)
def start_game(request: GameStartRequest = Body(default=GameStartRequest())):
    """Start a new game session"""
    return game_service.start_game(request.player_name)

@router.get("/random-code", response_model=RandomCodeResponse)
def random_code():
    """Get a random postal code"""
    return {"code": get_random_code()}

@router.get("/cities", response_model=CitiesResponse)
def cities():
    """Get list of cities"""
    return {"cities": get_cities()}

@router.post("/check", response_model=CheckAnswerResponse)
def check_answer(code: int, answer: str, game_id: str):
    """Check if answer is correct"""
    expected = get_destination(code)
    is_correct = expected.lower() == answer.lower()
    
     # Update game session and get status
    game_status = game_service.update_game_session(game_id, is_correct)
    
    return {
        "correct": is_correct,
        "expected": expected,
        "lives_remaining": game_status["lives_remaining"],  # ← NEW
        "game_over": game_status["game_over"]              # ← NEW
    }

@router.post("/end", response_model=GameEndResponse)
def end_game(request: GameEndRequest):
    """End game and get final stats"""
    return game_service.end_game(request.game_id)