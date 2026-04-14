from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.logic import get_destination
import random


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
    return { "code": random.randint(0, 8000)}


@app.post("/check")
def check_answer(code: int, answer: str):
    correct = get_destination(code)
    return {
        "correct": correct.lower() == answer.lower(),
        "expected": correct
    }