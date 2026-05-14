from pydantic import BaseModel
from datetime import datetime

class ScoreCreate(BaseModel):
    # Schema for creating a new score (API input)
    player_name: str = "Anonymous"
    score: int
    time_elapsed: int
    questions_answered: int
    
class ScoreResponse(BaseModel):
    # Schema for returning score data (API output)
    id: int
    player_name: str
    score: int
    time_elapsed: int
    questions_answered: int
    created_at: datetime
    
    class Config:
        from_attributes = True


class LeaderboardResponse(BaseModel):
    # Schema for returning leaderboard data (API output)
    scores: list[ScoreResponse]
    total : int