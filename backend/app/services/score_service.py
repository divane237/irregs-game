from sqlalchemy.orm import Session
from app.models.score import Score
from app.schemas.score import ScoreCreate
from typing import List

class ScoreService:
    
    @staticmethod
    def create_score(db: Session, score_data: ScoreCreate) -> Score:
        """Save a new score to the database.   """
        #Convert Pydantic model to dict
        
        score_dict = score_data.model_dump() if hasattr(score_data, 'model_dump') else score_data.dict()
        
        # Create SQLAlchemy model instance
        db_score = Score(**score_dict)
        
        # Add to session
        db.add(db_score)
        
        # Save to database
        db.commit()
        
        #Refresh to get auto-generated fields like id
        db.refresh(db_score)
        
        # Log for debugging
        print(f"✓ Score saved: {score_data.player_name} - {score_data.score} points")
        
        return db_score
    
    @staticmethod
    def get_leaderboard(db: Session, limit: int = 10) -> List[Score]:
        """Get top N scores from the database"""
        return db.query(Score)\
            .order_by(Score.score.desc(), Score.time_elapsed.asc())\
            .limit(limit)\
            .all()
    
    @staticmethod
    def get_total_games(db: Session) -> int:
        """Get total number of games played"""
        return db.query(Score).count()
    
# Create a singleton instance
score_service = ScoreService()

