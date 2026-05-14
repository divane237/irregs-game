function LoadingGame() {
  return (
    <div class="flex items-center justify-center min-h-screen">
        <div class="relative w-16 h-16">
            <div class="absolute w-full h-full border-4 border-blue-200 rounded-full"></div>
            <div class="absolute w-full h-full border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
    </div>
  )
}

export default LoadingGame;