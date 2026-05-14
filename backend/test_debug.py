from app.db.session import engine
from app.models import Base
from sqlalchemy import text

print("=" * 50)
print("DEBUG: Database diagnostics")
print("=" * 50)

# Check metadata
print(f"Tables in Base.metadata: {Base.metadata.tables.keys()}")

# Check connection
try:
    with engine.connect() as conn:
        result = conn.execute(text("SELECT current_database()"))
        row = result.fetchone()
        if row:
            db_name = row[0]
            print(f"✓ Connected to: {db_name}")
        else:
            print("✗ Could not fetch database name")
        
        
        result = conn.execute(text("""
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        """))
        tables = [row[0] for row in result]
        print(f"✓ Tables in database: {tables}")
        
except Exception as e:
    print(f"✗ Error: {e}")

print("=" * 50)