from app.db.session import SessionLocal
from app.schemas.score import ScoreCreate
from app.services.score_service import score_service

print("Testing Score Service...")
print("=" * 50)

db = SessionLocal()

try:
    # Test 1: Create scores
    print("\n1. Creating test scores...")
    
    scores_data = [
        ScoreCreate(player_name="Alice", score=20, time_elapsed=45, questions_answered=25),
        ScoreCreate(player_name="Bob", score=20, time_elapsed=60, questions_answered=25),
        ScoreCreate(player_name="Charlie", score=15, time_elapsed=30, questions_answered=18),
        ScoreCreate(player_name="Diana", score=25, time_elapsed=40, questions_answered=30),
    ]
    
    for score_data in scores_data:
        created_score = score_service.create_score(db, score_data)
        print(f"  Created: {created_score}")
    
    # Test 2: Get leaderboard
    print("\n2. Getting leaderboard (top 5)...")
    leaderboard = score_service.get_leaderboard(db, limit=5)
    
    for rank, score in enumerate(leaderboard, 1):
        print(f"  Rank {rank}: {score.player_name} - {score.score} points in {score.time_elapsed}s")
    
    # Test 3: Get total games
    print("\n3. Getting total games...")
    total = score_service.get_total_games(db)
    print(f"  Total games played: {total}")
    
    print("\n" + "=" * 50)
    print("✓ All tests passed!")
    
except Exception as e:
    print(f"\n✗ Error: {e}")
    import traceback
    traceback.print_exc()
finally:
    db.close()