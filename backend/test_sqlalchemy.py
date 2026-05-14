from app.db.session import engine, SessionLocal
from sqlalchemy import text

print("Testing SQLAlchemy connection...")


# TEst 1: Engine

try:
    with engine.connect() as conn:
        result = conn.execute(text("SELECT 1"))
        print(" Engine works! Result:")
except Exception as e:
    print(f"x Engine error: {e}")
    
# Test 2: Session

try:
    db = SessionLocal()
    result = db.execute(text("SELECT version()"))
    version = result.fetchone()
    if version:
        print(f"Session works! PostgreSQL version: {version[0][:30]}...")
    else:
        print(" Session returned no results")
    db.close()
except Exception as e:
    print(f"x Session error: {e}")