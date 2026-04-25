import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import CartonBox from "../components/CartonBox"

function Game() {
  const navigate = useNavigate()
  const [gameId, setGameId] = useState(null)
  const [code, setCode] = useState(null)
  const [cities, setCities] = useState([])
  const [result, setResult] = useState("")
  const [resultType, setResultType] = useState("")
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(5)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [serverTime, setServerTime] = useState(null)
  const [visible, setVisible] = useState(true)
  const [disabled, setDisabled] = useState(false)
  const [gameOver, setGameOver] = useState(false)

  // Fetch cities on mount
  useEffect(() => {
    fetchCities()
  }, [])

  // Start game session and fetch first code
  useEffect(() => {
    startGameSession()
  }, [])

  const startGameSession = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/game/start", {
        method: "POST"
      })
      const data = await res.json()
      setGameId(data.game_id)
      // Fetch first code immediately after setting game ID
      await fetchCodeNow()
    } catch (error) {
      console.error("Error starting game:", error)
    }
  }

  const fetchCodeNow = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/random-code")
      const data = await res.json()
      setCode(data.code)
      setResult("")
      setResultType("")
    } catch (error) {
      console.error("Error fetching code:", error)
    }
  }

  const fetchCities = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/cities")
      const data = await res.json()
      setCities(data.cities)
    } catch (error) {
      console.error("Error fetching cities:", error)
    }
  }

  // Timer counting UP continuously
  useEffect(() => {
    if (gameOver || disabled) return

    const timer = setInterval(() => {
      setTimeElapsed(t => t + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [gameOver, disabled])

  const sendAnswer = async (answer) => {
    if (!gameId) return
    
    setDisabled(true)
    
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/check?code=${code}&answer=${answer}&game_id=${gameId}`,
        { method: "POST" }
      )
      const data = await res.json()

      if (data.correct) {
        setScore(s => s + 1)
        setResult("Correct!")
        setResultType("correct")
      } else {
        setLives(l => l - 1)
        setResult(`Wrong — correct answer: ${data.expected}`)
        setResultType("wrong")

        if (lives - 1 <= 0) {
          await endGameSession()
          return
        }
      }

      setTimeout(() => {
        setVisible(false)
        setTimeout(async () => {
          await fetchCodeNow()
          setVisible(true)
          setDisabled(false)
        }, 200)
      }, 1000)
    } catch (error) {
      console.error("Error checking answer:", error)
      setDisabled(false)
    }
  }

  const endGameSession = async () => {
    if (!gameId) {
      setGameOver(true)
      return
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/game/end", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ game_id: gameId })
      })
      const data = await res.json()
      setServerTime(data.time_elapsed)
      setGameOver(true)
    } catch (error) {
      console.error("Error ending game:", error)
      setGameOver(true)
    }
  }

  const restartGame = () => {
    setScore(0)
    setLives(5)
    setTimeElapsed(0)
    setServerTime(null)
    setGameOver(false)
    setDisabled(false)
    setGameId(null)
    setCode(null)
    startGameSession()
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Game Over Screen
  if (gameOver) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white border border-gray-200 rounded-2xl p-10 w-full max-w-md text-center shadow-sm">
          <p className="text-xs font-mono font-bold tracking-widest uppercase text-gray-400 mb-4">
            Game Over
          </p>
          
          <h2 className="text-4xl font-bold text-gray-800 mb-4">💀</h2>
          
          <div className="mb-8 space-y-4">
            <div>
              <p className="text-gray-600 mb-2">Final Score</p>
              <p className="text-5xl font-bold text-blue-600">{score}</p>
            </div>
            <div>
              <p className="text-gray-600 mb-2">Total Time</p>
              <p className="text-3xl font-bold text-gray-800 font-mono">
                {formatTime(serverTime || timeElapsed)}
              </p>
              {serverTime && (
                <p className="text-xs text-green-600 mt-1">✓ Verified by server</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={restartGame}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all active:scale-95"
            >
              Play Again
            </button>
            <button
              onClick={() => navigate('/')}
              className="border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-all active:scale-95"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Main Game Screen
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <button 
        onClick={() => navigate('/')}
        className="absolute top-4 left-4 text-gray-600 hover:text-gray-800 flex items-center gap-2 transition-colors font-medium"
      >
        ← Home
      </button>

      <div className="bg-white border border-gray-200 rounded-2xl p-10 w-full max-w-md text-center shadow-sm">
        <p className="text-xs font-mono font-bold tracking-widest uppercase text-gray-400 mb-6">
          UPS Code Game
        </p>

        <div className="flex justify-between items-center mb-6 gap-3">
          <div className="flex-1 bg-gray-100 rounded-lg px-3 py-2">
            <p className="text-xs text-gray-500">Score</p>
            <p className="text-xl font-bold text-gray-800">{score}</p>
          </div>

          <div className="flex-1 bg-red-50 rounded-lg px-3 py-2">
            <p className="text-xs text-gray-500">Lives</p>
            <p className="text-xl font-bold text-red-600">
              {'❤️'.repeat(lives)}
              {'🤍'.repeat(5 - lives)}
            </p>
          </div>

          <div className="flex-1 bg-blue-50 rounded-lg px-3 py-2">
            <p className="text-xs text-gray-500">Time</p>
            <p className="text-xl font-bold text-blue-600 font-mono">
              {formatTime(timeElapsed)}
            </p>
          </div>
        </div>

        <CartonBox code={code} visible={visible} />

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