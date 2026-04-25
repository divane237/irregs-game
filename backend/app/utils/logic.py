import random

RANGES = [
    {"min": 1032, "max": 2333, "city": "Berlin"},
    {"min": 2334, "max": 2543, "city": "Gera"},
    {"min": 6903, "max": 7899, "city": "Nürnberg"},
    {"min": 0, "max": 900, "city": "N/A"},
]

def get_destination(code: int):
    for r in RANGES:
        if r["min"] <= code <= r["max"]:
            return r["city"]
    return "Unknown"

def get_random_code():
    r = random.choice(RANGES)
    return random.randint(r["min"], r["max"])

def get_cities():
    return [r["city"] for r in RANGES]