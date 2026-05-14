from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.score import ScoreCreate, ScoreResponse, LeaderboardResponse
from app.services.score_service import score_service

router = APIRouter()

@router.post("/save", response_model=ScoreResponse, status_code=status.HTTP_201_CREATED)
def save_score(score_data: ScoreCreate, db: Session = Depends(get_db)):
    """
    Save a new score to the leaderboard
    
    - **player_name**: Player's name (default: "Anonymous")
    - **score**: Number of correct answers
    - **time_elapsed**: Time taken in seconds
    - **questions_answered**: Total questions attempted
    """
    
    score = score_service.create_score(db, score_data)
    return score

@router.get("/top", response_model=LeaderboardResponse)
def get_leaderboard(limit: int = 10, db: Session = Depends(get_db)):
    """
    Get top N scores from the leaderboard
    
    - **limit**: Number of top scores to return (default: 10, max: 100)
    """
    # Enforce maximum limit
    if limit > 100:
        limit = 100
    
    scores = score_service.get_leaderboard(db, limit)
    total = score_service.get_total_games(db)
    
    return {"scores": scores, "total": total}
    