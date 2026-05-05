import { useState, useEffect } from 'react'

/**
 * Custom hook for game timer
 * Counts upward from 0
 */
export const useGameTimer = (isRunning = true) => {
  const [timeElapsed, setTimeElapsed] = useState(0)

  useEffect(() => {
    if (!isRunning) return

    const timer = setInterval(() => {
      setTimeElapsed(t => t + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [isRunning])

  const resetTimer = () => setTimeElapsed(0)

  return { timeElapsed, resetTimer }
}