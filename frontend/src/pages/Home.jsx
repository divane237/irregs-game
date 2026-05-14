import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-200">
        
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-xs font-mono font-bold tracking-widest uppercase text-gray-400 mb-4">
            Welcome to
          </p>
          <h1 className="text-5xl md:text-6xl font-bold text-blue-600 mb-4">
            UPS CODE GAME
          </h1>
          <p className="text-lg text-gray-600">
            Guess the city based on postal codes!
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 max-w-md mx-auto mb-8">
          <button 
            onClick={() => navigate('/play')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all active:scale-95 shadow-sm"
          >
            Play Game
          </button>

          <button onClick={() => navigate('/leaderboard')} className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95">
            🏆 Leaderboard
          </button>


          {/* <button 
            disabled
            className="bg-gray-100 border border-gray-200 text-gray-400 font-medium py-4 px-8 rounded-lg text-lg cursor-not-allowed"
          >
            Leaderboard (Coming Soon)
          </button>
           */}
          <button 
            disabled
            className="bg-gray-100 border border-gray-200 text-gray-400 font-medium py-4 px-8 rounded-lg text-lg cursor-not-allowed"
          >
            Login (Coming Soon)
          </button>
        </div>

        {/* Info Section */}
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-3">
            How to Play
          </h2>
          <p className="text-gray-600 leading-relaxed text-sm">
            You'll see a postal code range. Click the city you think it belongs to. Get it right to increase your score!
          </p>
        </div>

      </div>
    </div>
  )
}

export default Home