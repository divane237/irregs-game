/**
 * Format seconds to MM:SS
 */
export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

/**
 * API base URL
 */
export const API_BASE_URL = "http://127.0.0.1:8000/api/v1"