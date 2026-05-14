from app.db.session import SessionLocal
from app.models.score import Score

print("Testing database insertion...")

db = SessionLocal()

try:
    # Create a new score
    new_score = Score(
        player_name="Alice",
        score=15,
        time_elapsed=45,
        questions_answered=18
    )
    
    db.add(new_score)
    db.commit()
    db.refresh(new_score)
    
    print(f"✓ Score saved!")
    print(f"  ID: {new_score.id}")
    print(f"  Player: {new_score.player_name}")
    print(f"  Score: {new_score.score}")
    print(f"  Created: {new_score.created_at}")
    
    # Query all scores
    all_scores = db.query(Score).all()
    print(f"\n✓ Total scores in database: {len(all_scores)}")
    for score in all_scores:
        print(f"  - {score}")
    
except Exception as e:
    print(f"✗ Error: {e}")
    db.rollback()
finally:
    db.close()