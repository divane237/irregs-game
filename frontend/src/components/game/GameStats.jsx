import { formatTime } from '../../utils/helpers'

function GameStats({ score, lives, timeElapsed }) {
  return (
    <div className="flex justify-between items-center mb-6 gap-3">
      
      {/* Score */}
      <div className="flex-1 bg-gray-100 rounded-lg px-3 py-2">
        <p className="text-xs text-gray-500">Score</p>
        <p className="text-xl font-bold text-gray-800">{score}</p>
      </div>

      {/* Lives */}
      <div className="flex-1 bg-red-50 rounded-lg px-3 py-2">
        <p className="text-xs text-gray-500">Lives</p>
        <p className="text-xl font-bold text-red-600">
          {'❤️'.repeat(lives)}
          {'🤍'.repeat(3 - lives)}
        </p>
      </div>

      {/* Timer */}
      <div className="flex-1 bg-blue-50 rounded-lg px-3 py-2">
        <p className="text-xs text-gray-500">Time</p>
        <p className="text-xl font-bold text-blue-600 font-mono">
          {formatTime(timeElapsed)}
        </p>
      </div>

    </div>
  )
}

export default GameStats