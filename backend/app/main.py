from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.logic import get_destination, get_random_code, get_cities

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "UPS Game API running"}

@app.get("/random-code")
def random_code():
    return {"code": get_random_code()}

@app.get("/cities")
def cities():
    return {"cities": get_cities()}

@app.post("/check")
def check_answer(code: int, answer: str):
    expected = get_destination(code)
    return {
        "correct": expected.lower() == answer.lower(),
        "expected": expected
    }