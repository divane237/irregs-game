from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from app.db.base import Base

class Score(Base):
    __tablename__ = "scores"

    id = Column(Integer, primary_key=True, index=True)
    player_name = Column(String, default="Anonymous", nullable=False)
    score = Column(Integer, nullable=False)
    time_elapsed = Column(Integer, nullable=False)  
    questions_answered = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    def __repr__(self):
        return f"<Score {self.player_name} : {self.score} points"