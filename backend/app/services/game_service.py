import time
import uuid
from typing import Dict

# In-memory sessions
game_sessions: Dict[str, dict] = {}

class GameService:
    
    @staticmethod
    def start_game(player_name: str = "Anonymous") -> dict:
        """Start a new game session"""
        game_id = str(uuid.uuid4())
        print(f"{game_id}")
        game_sessions[game_id] = {
            "player_name": player_name,
            "start_time": time.time(),
            "score": 0,
            "lives": 3,
            "questions_answered": 0
        }
        print(f" Game started: {game_id[:8]} for {player_name}")
        return {
            "game_id": game_id,
            "start_time": game_sessions[game_id]["start_time"]
        }
    
    @staticmethod
    def update_game_session(game_id: str, is_correct: bool) -> dict:
        """Update game session after answer"""
        if game_id not in game_sessions:
            return  {
                "lives_remaining": 0,
                "game_over": True
            }
        
        session = game_sessions[game_id]
        session["questions_answered"] += 1
        
        if is_correct:
            session["score"] += 1
        else:
            session["lives"] -= 1
            
        print(f"  Game {game_id[:8]}: Score={session['score']}, Lives={session['lives']}")
        return {
            "lives_remaining": session["lives"],
            "game_over": session["lives"] <= 0  # ← Backend decides
        }
    
    @staticmethod
    def end_game(game_id: str) -> dict:
        """End game and calculate final stats"""
        if game_id not in game_sessions:
            return {
                "game_id": game_id,
                "score": 0,
                "time_elapsed": 0,
                "questions_answered": 0
            }
        
        session = game_sessions[game_id]
        end_time = time.time()
        
        # Calculate actual elapsed time
        actual_time_elapsed = int(end_time - session["start_time"])
        
        result = {
            "game_id": game_id,
            "score": session["score"],
            "time_elapsed": actual_time_elapsed,
            "questions_answered": session["questions_answered"]
        }
        
        print(f"Game ended: {game_id[:8]}, Time={actual_time_elapsed}s, Score={session['score']}")
        
        # Clean up session
        del game_sessions[game_id]
        
        return result

game_service = GameService()