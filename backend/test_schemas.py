from app.schemas.score import ScoreCreate, LeaderboardResponse, ScoreResponse
from datetime import datetime

print("Testing Pydantic Schemas...")
print("=" * 50)

# Test 1 : Valid Input

print("\n1. Testing ScoreCreate (valid)...")

try: 
    score_input = ScoreCreate(
        player_name="Alice",
        score=15,
        time_elapsed=45,
        questions_answered=18      
    )
    
    print("✓ ScoreCreate created successfully:")
    print(f" As dic: {score_input.model_dump()}")
except Exception as e:
    print(f"✗ Error creating ScoreCreate: {e}")
    
# Test 2 : Invalid Input
print("\n2. Testing ScoreCreate (Invalid - wront Type)...")
try: 
    score_input = ScoreCreate(
        player_name="Alice",
        score="fifteen",  # Invalid type
        time_elapsed=30,
        questions_answered=20      
    )
    
    print(f" x This fails ")
except Exception as e:
    print(f"✓ Correctly failed to create ScoreCreate: {e}")
    

# Test 3: Missing required field
print("\n3. Testing ScoreCreate (missing field)...")
try:
    score_input = ScoreCreate(
        player_name="Alice",
        score=15
        # Missing time_elapsed!
    )
    print(f"✗ This should have failed!")
except Exception as e:
    print(f"✓ Correctly rejected: {e}")

# Test 4: Default value
print("\n4. Testing ScoreCreate (using default)...")
try:
    score_input = ScoreCreate(
        # No player_name - should use default
        score=15,
        time_elapsed=45,
        questions_answered=18
    )
    print(f"✓ Valid: {score_input}")
    print(f"  player_name = '{score_input.player_name}' (default)")
except Exception as e:
    print(f"✗ Error: {e}")

# Test 5: ScoreResponse
print("\n5. Testing ScoreResponse...")
try:
    score_output = ScoreResponse(
        id=1,
        player_name="Alice",
        score=15,
        time_elapsed=45,
        questions_answered=18,
        created_at=datetime.now()
    )
    print(f"✓ Valid: {score_output}")
except Exception as e:
    print(f"✗ Error: {e}")

# Test 6: LeaderboardResponse
print("\n6. Testing LeaderboardResponse...")
try:
    leaderboard = LeaderboardResponse(
        scores=[
            ScoreResponse(
                id=1,
                player_name="Alice",
                score=15,
                time_elapsed=45,
                questions_answered=18,
                created_at=datetime.now()
            ),
            ScoreResponse(
                id=2,
                player_name="Bob",
                score=12,
                time_elapsed=60,
                questions_answered=15,
                created_at=datetime.now()
            )
        ],
        total=2
    )
    print(f"✓ Valid leaderboard with {len(leaderboard.scores)} scores")
    print(f"  Total games: {leaderboard.total}")
except Exception as e:
    print(f"✗ Error: {e}")

print("\n" + "=" * 50)
print("✓ Schema tests complete!")