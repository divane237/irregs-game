import { formatTime } from '../../utils/helpers'

function GameOver({ score, timeElapsed, serverTime, onRestart, onHome }) {
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
            onClick={onRestart}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all active:scale-95"
          >
            Play Again
          </button>
          <button
            onClick={onHome}
            className="border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-all active:scale-95"
          >
            Back to Home
          </button>
        </div>
        
      </div>
    </div>
  )
}

export default GameOver