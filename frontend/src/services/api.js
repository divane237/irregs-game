const API_BASE = "http://127.0.0.1:8000/api/v1"

class GameAPI {
  /**
   * Start a new game session
   */
  static async startGame(playerName = "Anonymous") {
    const response = await fetch(`${API_BASE}/game/start`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ player_name: playerName })
    })
    if (!response.ok) throw new Error("Failed to start game")
    return response.json()
  }

  /**
   * Get a random postal code
   */
  static async getRandomCode() {
    const response = await fetch(`${API_BASE}/game/random-code`)
    if (!response.ok) throw new Error("Failed to get code")
    return response.json()
  }

  /**
   * Get list of cities
   */
  static async getCities() {
    const response = await fetch(`${API_BASE}/game/cities`)
    if (!response.ok) throw new Error("Failed to get cities")
    return response.json()
  }

  /**
   * Check answer
   * Returns: { correct, expected, lives_remaining, game_over }
   */
  static async checkAnswer(code, answer, gameId) {
    const response = await fetch(
      `${API_BASE}/game/check?code=${code}&answer=${answer}&game_id=${gameId}`,
      { method: "POST" }
    )
    if (!response.ok) throw new Error("Failed to check answer")
    return response.json()
  }

  /**
   * End game session
   */
  static async endGame(gameId) {
    const response = await fetch(`${API_BASE}/game/end`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ game_id: gameId })
    })
    if (!response.ok) throw new Error("Failed to end game")
    return response.json()
  }


   /**
   * Save score to leaderboard
   */
   static async saveScore(playerName, score, timeElapsed, questionsAnswered) {
    const response = await fetch(`${API_BASE}/leaderboard/save`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        player_name: playerName,
        score: score,
        time_elapsed: timeElapsed,
        questions_answered: questionsAnswered
      })
    })
    if (!response.ok) throw new Error("Failed to save score")
    return response.json()
  }


  /**
   * Get leaderboard
   */
  static async getLeaderboard(limit = 10) {
    const response = await fetch(`${API_BASE}/leaderboard/top?limit=${limit}`)
    if (!response.ok) throw new Error("Failed to get leaderboard")
    return response.json()
  }


}

export default GameAPI