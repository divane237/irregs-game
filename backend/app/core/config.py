import os
from typing import List

class Settings:
    # API Settings
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "UPS Code Game"
    
    # Database - Read from environment variable
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql://postgres:divane@localhost:5432/ups_game")
    
    # CORS
    BACKEND_CORS_ORIGINS: List[str] = os.getenv(
        "CORS_ORIGINS", 
        "http://localhost:5173").split(",")
    
    class Config:
        case_sensitive = True

settings = Settings()