from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.logic import get_destination, get_random_code, get_cities
import time
from typing import Dict
from pydantic import BaseModel


class GameEndRequest(BaseModel):
    game_id: str



app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory game sessions (To later move to database)
game_sessions: Dict[str, dict] = {}

@app.get("/")
def root():
    return {"message": "UPS Game API running"}

@app.get("/random-code")
def random_code():
    return {"code": get_random_code()}

@app.get("/cities")
def cities():
    return {"cities": get_cities()}

# New: Start game session
@app.post("/game/start")
def start_game():
    import uuid
    game_id = str(uuid.uuid4())
    game_sessions[game_id] = {
        "start_time": time.time(),
        "score": 0,
        "lives": 5,
        "questions_answered": 0
    }
    return {
        "game_id": game_id,
        "start_time": game_sessions[game_id]["start_time"]
    }


# Check the ansewr with game_id
@app.post("/check")
def check_answer(code: int, answer: str, game_id: str ):
    expected = get_destination(code)
    is_correct = expected.lower() == answer.lower()
    
    # Update game session if provided
    if game_id and game_id in game_sessions:
        game_sessions[game_id]["questions_answered"] += 1
        if is_correct:
            game_sessions[game_id]["score"] += 1
        else:
            game_sessions[game_id]["lives"] -= 1
            
    return {
        "correct": is_correct,
        "expected": expected
    }
    
# NEW: End game and get final stats
@app.post("/game/end")
def end_game(request: GameEndRequest):
    game_id = request.game_id
    
    if game_id not in game_sessions:
        return {"error": "Game session not found", "time_elapsed": 0}
    
    session = game_sessions[game_id]
    end_time = time.time()
    
    # Calculate ACTUAL elapsed time 
    actual_time_elapsed = int(end_time - session["start_time"])
    
    result = {
        "game_id": game_id,
        "score": session["score"],
        "time_elapsed": actual_time_elapsed,
        "questions_answered": session["questions_answered"]
    }
    
    print(f"✓ Game ended: Time={actual_time_elapsed}s, Score={session['score']}")
    
    # Clean up session
    del game_sessions[game_id]
    
    return result