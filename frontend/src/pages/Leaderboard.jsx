import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import GameAPI from "../services/api"
import { formatTime } from "../utils/helpers"

function Leaderboard() {
  const navigate = useNavigate()
  const [scores, setScores] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLeaderboard()
  }, [])

  const fetchLeaderboard = async () => {
    try {
      const data = await GameAPI.getLeaderboard(10)
      setScores(data.scores)
      setTotal(data.total)
    } catch (error) {
      console.error("Error fetching leaderboard:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 to-pink-50 p-4">
      
      {/* Back Button */}
      <button 
        onClick={() => navigate('/')}
        className="text-gray-600 hover:text-gray-800 flex items-center gap-2 transition-colors font-medium mb-4"
      >
        ← Back to Home
      </button>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8 md:p-12">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">
            🏆 Leaderboard
          </h1>
          <p className="text-gray-600">
            Top {scores.length} players • {total} total games played
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading scores...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && scores.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No scores yet!</p>
            <button
              onClick={() => navigate('/play')}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all active:scale-95"
            >
              Be the first to play!
            </button>
          </div>
        )}

        {/* Leaderboard Table */}
        {!loading && scores.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-600 font-semibold">Rank</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-semibold">Player</th>
                  <th className="text-center py-3 px-4 text-gray-600 font-semibold">Score</th>
                  <th className="text-center py-3 px-4 text-gray-600 font-semibold">Time</th>
                  <th className="text-center py-3 px-4 text-gray-600 font-semibold">Questions</th>
                  <th className="text-right py-3 px-4 text-gray-600 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {scores.map((score, index) => (
                  <tr 
                    key={score.id} 
                    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                      index < 3 ? 'bg-yellow-50' : ''
                    }`}
                  >
                    {/* Rank */}
                    <td className="py-4 px-4">
                      <span className={`font-bold text-lg ${
                        index === 0 ? 'text-yellow-500' :
                        index === 1 ? 'text-gray-400' :
                        index === 2 ? 'text-orange-600' :
                        'text-gray-600'
                      }`}>
                        {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                      </span>
                    </td>

                    {/* Player Name */}
                    <td className="py-4 px-4 font-medium text-gray-800">
                      {score.player_name}
                    </td>

                    {/* Score */}
                    <td className="py-4 px-4 text-center">
                      <span className="bg-blue-100 text-blue-800 font-bold py-1 px-3 rounded-full">
                        {score.score}
                      </span>
                    </td>

                    {/* Time */}
                    <td className="py-4 px-4 text-center font-mono text-gray-700">
                      {formatTime(score.time_elapsed)}
                    </td>

                    {/* Questions */}
                    <td className="py-4 px-4 text-center text-gray-600">
                      {score.questions_answered}
                    </td>

                    {/* Date */}
                    <td className="py-4 px-4 text-right text-sm text-gray-500">
                      {new Date(score.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4 justify-center">
          <button
            onClick={() => navigate('/play')}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all active:scale-95"
          >
            Play Now
          </button>
          <button
            onClick={fetchLeaderboard}
            className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-all active:scale-95"
          >
            🔄 Refresh
          </button>
        </div>

      </div>
    </div>
  )
}

export default Leaderboard