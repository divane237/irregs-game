# Irregs Game - German Postal Code Quiz

A full-stack web application that challenges players to match German postal codes (Postleitzahlen) to their corresponding cities. Built with modern technologies and deployed to production.

(https://irregs-game-frontend.onrender.com)
(https://irregs-game.onrender.com/docs)

## Live Demo

** Learn:** [https://irregs-game-frontend.onrender.com](https://irregs-game-frontend.onrender.com)

**API Documentation:** [https://irregs-game.onrender.com/docs](https://irregs-game.onrender.com/docs)


---

## Features

### Core Gameplay
- **5-life system** with visual heart indicators
- **Real-time timer** tracking game duration
- **Score tracking** with questions answered counter
- **Instant feedback** on correct/incorrect answers
- **Server-validated** game logic (no cheating!)

### Leaderboard System
- **Persistent storage** in PostgreSQL database
- **Smart ranking** algorithm (higher score, then faster time)
- **Medal system** for top 3 players
- **Total games counter**
- **Auto-save** on game completion

### User Experience
- **Responsive design** (mobile & desktop)
- **Loading states** for better UX
- **Smooth animations** and transitions
- **Clean, modern UI** with Tailwind CSS
- **No authentication required** - just play!

---

## Tech Stack

### Backend
- **Python 3.12**
- **FastAPI** - Modern, fast web framework
- **SQLAlchemy** - SQL toolkit and ORM
- **PostgreSQL** - Production database
- **Pydantic** - Data validation
- **Uvicorn** - ASGI server

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **Custom Hooks** - Reusable logic

### DevOps & Deployment
- **Render.com** - Cloud hosting
- **Git/GitHub** - Version control
- **Environment Variables** - Configuration management

---

## Architecture

### Project Structure

irregs-game/
├── backend/ 
│   ├── app/
│   │   ├── api/
│   │   │   └── routes/          # API endpoints
│   │   │       ├── game.py
│   │   │       └── leaderboard.py
│   │   ├── core/
│   │   │   └── config.py        # Configuration
│   │   ├── db/
│   │   │   ├── base.py          # Database base
│   │   │   └── session.py       # Session management
│   │   ├── models/
│   │   │   └── score.py         # SQLAlchemy models
│   │   ├── schemas/
│   │   │   ├── game.py          # Pydantic schemas
│   │   │   └── score.py
│   │   ├── services/
│   │   │   ├── game_service.py  # Business logic
│   │   │   └── score_service.py
│   │   └── main.py              # Application entry
│   └── requirements.txt
│
└── frontend/
└── src/
├── components/
│   ├── CartonBox.jsx
│   └── game/
│       ├── GameStats.jsx
│       └── GameOver.jsx
├── hooks/
│   └── useGameTimer.js   # Custom timer hook
├── pages/
│   ├── Home.jsx
│   ├── Game.jsx
│   └── Leaderboard.jsx
├── services/
│   └── api.js            # API client
└── utils/
└── helpers.js        # Utility functions

### Design Patterns
- **Service Layer Pattern** - Separation of business logic
- **Repository Pattern** - Data access abstraction
- **Dependency Injection** - FastAPI's `Depends()`
- **Custom Hooks** - React reusable logic
- **Component Composition** - Modular UI components

---

## Getting Started

### Prerequisites
- Python 3.12+
- Node.js 18+
- PostgreSQL 15+
- Git

### Local Development

#### 1. Clone the repository
```bash
git clone https://github.com/divane237/irregs-game.git
cd irregs-game
```

#### 2. Backend Setup
```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
echo "DATABASE_URL=postgresql://postgres:password@localhost:5432/irregs_game" > .env
echo "CORS_ORIGINS=http://localhost:5173" >> .env

# Create database
createdb irregs_game

# Run the server
uvicorn app.main:app --reload
```

Backend will run at `http://127.0.0.1:8000`

#### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Create .env file
echo "VITE_API_BASE_URL=http://127.0.0.1:8000/api/v1" > .env

# Run the dev server
npm run dev
```

Frontend will run at `http://localhost:5173`

---

## API Documentation

Once the backend is running, visit:
- **Interactive Docs:** `http://127.0.0.1:8000/docs`
- **Alternative Docs:** `http://127.0.0.1:8000/redoc`

### Key Endpoints

#### Game Endpoints
```http
POST   /api/v1/game/start           # Start a new game session
GET    /api/v1/game/random-code     # Get a random postal code
GET    /api/v1/game/cities          # Get list of cities
POST   /api/v1/game/check           # Check answer
POST   /api/v1/game/end             # End game and get stats
```

#### Leaderboard Endpoints
```http
POST   /api/v1/leaderboard/save     # Save a score
GET    /api/v1/leaderboard/top      # Get top scores
```

---

## Database Schema

### Scores Table
```sql
CREATE TABLE scores (
    id                  SERIAL PRIMARY KEY,
    player_name         VARCHAR DEFAULT 'Anonymous' NOT NULL,
    score               INTEGER NOT NULL,
    time_elapsed        INTEGER NOT NULL,
    questions_answered  INTEGER DEFAULT 0,
    created_at          TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_scores_ranking ON scores(score DESC, time_elapsed ASC);
```

---

## Deployment

### Backend (Render.com)
```bash
# Environment Variables
DATABASE_URL=<render_postgres_url>
CORS_ORIGINS=http://localhost:5173,https://irregs-game-frontend.onrender.com

# Build Command
pip install -r requirements.txt

# Start Command
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

### Frontend (Render.com)
```bash
# Build Command
npm install && npm run build

# Publish Directory
dist

# Environment Variables
VITE_API_BASE_URL=https://irregs-game.onrender.com/api/v1
```

---

## Key Learnings

### Backend Architecture
- **Separation of Concerns:** Routes → Services → Models → Database
- **Server Authority:** Lives and timer validated server-side
- **Clean API Design:** RESTful principles with proper status codes
- **Data Validation:** Pydantic schemas for input/output

### Frontend Architecture
- **Component Modularity:** Reusable, single-responsibility components
- **Custom Hooks:** Extracted timer logic for reusability
- **Service Layer:** Centralized API calls in `api.js`
- **State Management:** Proper use of React hooks

### DevOps
- **Environment Variables:** Secure configuration management
- **CORS Configuration:** Proper cross-origin setup
- **Cloud Deployment:** PostgreSQL + FastAPI + React on Render
- **Version Control:** Git workflow with meaningful commits

---

## Future Enhancements

### Planned Features
- [ ] **User Authentication** - JWT-based login system
- [ ] **Player Profiles** - Personal statistics and history
- [ ] **More Cities** - Expand beyond 4 cities
- [ ] **Difficulty Levels** - Easy, Medium, Hard modes
- [ ] **Achievements** - Badges and milestones
- [ ] **Multiplayer Mode** - Real-time competitions with WebSockets
- [ ] **Mobile App** - React Native version
- [ ] **Analytics Dashboard** - Admin panel with game statistics

### Technical Improvements
- [ ] **Docker** - Containerization for easier deployment
- [ ] **CI/CD** - GitHub Actions for automated testing/deployment
- [ ] **Unit Tests** - pytest for backend, Jest for frontend
- [ ] **E2E Tests** - Playwright for integration testing
- [ ] **Rate Limiting** - Prevent API abuse
- [ ] **Caching** - Redis for performance optimization
- [ ] **Custom Domain** - Professional URL

---


## Author

**Divane**
- GitHub: [@divane237](https://github.com/divane237)
- Project Link: [https://github.com/divane237/irregs-game](https://github.com/divane237/irregs-game)

---


---
