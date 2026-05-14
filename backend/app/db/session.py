from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

# Use DATABAE_URL from settings (Reads from environment)

DATABASE_URL = settings.DATABASE_URL

engine = create_engine(DATABASE_URL)


#Create engine for connection pool
engine = create_engine(DATABASE_URL)

# Create a session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
