import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import GameAPI from "../services/api"
import { useGameTimer } from "../hooks/useGameTimer"
import CartonBox from "../components/CartonBox"
import GameStats from "../components/game/GameStats"
import GameOver from "../components/game/GameOver"
import LoadingGame from "../components/LoadingGame"

function Game() {
  const navigate = useNavigate()
  
  // Game state
  const [gameId, setGameId] = useState(null)
  const [code, setCode] = useState(null)
  const [cities, setCities] = useState([])
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [gameOver, setGameOver] = useState(false)
  
  // UI state
  const [result, setResult] = useState("")
  const [resultType, setResultType] = useState("")
  const [visible, setVisible] = useState(true)
  const [disabled, setDisabled] = useState(false)
  const [serverTime, setServerTime] = useState(null)
  const [loading, setLoading] = useState(true)
  
  // Timer (using custom hook)
  const { timeElapsed, resetTimer } = useGameTimer(!gameOver && !disabled)

  // Initialize game on mount
  useEffect(() => {
    initGame()
  }, [])

  const initGame = async () => {
    setLoading(true)
    try {
      // Fetch cities
      const citiesData = await GameAPI.getCities()
      setCities(citiesData.cities)

      // Start game session
      const sessionData = await GameAPI.startGame("Anonymous")
      setGameId(sessionData.game_id)

      // Get first code
      await fetchNewCode()
    } catch (error) {
      console.error("Error initializing game:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchNewCode = async () => {
    try {
      const data = await GameAPI.getRandomCode()
      setCode(data.code)
      setResult("")
      setResultType("")
    } catch (error) {
      console.error("Error fetching code:", error)
    }
  }

  const sendAnswer = async (answer) => {
    if (!gameId || !code) return
    
    setDisabled(true)
    
    try {
      const data = await GameAPI.checkAnswer(code, answer, gameId)

      // Update lives from backend
      setLives(data.lives_remaining)

      if (data.correct) {
        setScore(s => s + 1)
        setResult("Correct!")
        setResultType("correct")
      } else {
        setResult(`Wrong — correct answer: ${data.expected}`)
        setResultType("wrong")
      }

      // Check if game over (backend decides)
      if (data.game_over) {
        await endGameSession()
        return
      }

      // Load next question after delay
      setTimeout(() => {
        setVisible(false)
        setTimeout(async () => {
          await fetchNewCode()
          setVisible(true)
          setDisabled(false)
        }, 200)
      }, 1000)
    } catch (error) {
      console.error("Error checking answer:", error)
      setDisabled(false)
    }
  }


  // End game session 
  const endGameSession = async () => {
    if (!gameId) {
      setGameOver(true)
      return
    }

    try {
      // Get final stats from backedn
      const data = await GameAPI.endGame(gameId);
      setServerTime(data.time_elapsed);

      // Save score to leaderboard
      await GameAPI.saveScore("Anonymous", score, data.time_elapsed, data.questions_answered);
      
      console.log("Score saved to leaderboard");

      setGameOver(true);
    } catch (error) {
      console.error("Error ending game:", error)
      setGameOver(true)
    }
  }

  const restartGame = () => {
    setScore(0)
    setLives(3)
    resetTimer()
    setServerTime(null)
    setGameOver(false)
    setDisabled(false)
    setGameId(null)
    setCode(null)
    initGame()
  }

  // Game Over Screen
  if (gameOver) {
    return (
      <GameOver
        score={score}
        timeElapsed={timeElapsed}
        serverTime={serverTime}
        onRestart={restartGame}
        onHome={() => navigate('/')}
      />
    )
  }

  // Loading before game loads after a gameover
  if (loading) {
    return (
      <LoadingGame />
    )
  }


  // Main Game Screen
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      
      {/* Back Button */}
      <button 
        onClick={() => navigate('/')}
        className="absolute top-4 left-4 text-gray-600 hover:text-gray-800 flex items-center gap-2 transition-colors font-medium"
      >
        ← Home
      </button>

      <div className="bg-white border border-gray-200 rounded-2xl p-10 w-full max-w-md text-center shadow-sm">
        
        <p className="text-xs font-mono font-bold tracking-widest uppercase text-gray-400 mb-6">
          IRREGS Code Game
        </p>

        {/* Game Stats Component */}
        <GameStats 
          score={score}
          lives={lives}
          timeElapsed={timeElapsed}
        />

        {/* Code Display */}
        <CartonBox code={code} visible={visible} />

        {/* City Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {cities.map(city => (
            <button
              key={city}
              onClick={() => sendAnswer(city)}
              disabled={disabled || !code}
              className="border border-gray-200 rounded-lg py-3 px-4 text-sm font-medium text-gray-800 hover:bg-gray-50 hover:border-gray-300 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {city}
            </button>
          ))}
        </div>

        {/* Result Message */}
        <p className={`text-sm min-h-5 font-medium transition-opacity ${
          resultType === "correct" ? "text-green-700" :
          resultType === "wrong" ? "text-red-700" : "text-transparent"
        }`}>
          {result || "."}
        </p>

      </div>
    </div>
  )
}

export default Game