from pydantic import BaseModel, Field

# Request schemas
class GameStartRequest(BaseModel):
    player_name: str = Field(default="Anonymous")

class GameEndRequest(BaseModel):
    game_id: str

# Response schemas
class GameStartResponse(BaseModel):
    game_id: str
    start_time: float

class GameEndResponse(BaseModel):
    game_id: str
    score: int
    time_elapsed: int
    questions_answered: int

class CheckAnswerResponse(BaseModel):
    correct: bool
    expected: str
    lives_remaining: int        
    game_over: bool           
    
class CitiesResponse(BaseModel):
    cities: list[str]

class RandomCodeResponse(BaseModel):
    code: int
