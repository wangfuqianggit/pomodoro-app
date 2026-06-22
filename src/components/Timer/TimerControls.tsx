import { useTimer } from '../../hooks/useTimer'

export function TimerControls() {
  const { isRunning, toggle, reset } = useTimer()

  return (
    <div className="flex items-center gap-4">
      {/* Reset button */}
      <button
        onClick={reset}
        className="w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white flex items-center justify-center transition-colors"
        title="重置"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
        </svg>
      </button>

      {/* Play/Pause button */}
      <button
        onClick={toggle}
        className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-lg ${
          isRunning
            ? 'bg-white/10 hover:bg-white/20 text-white'
            : 'bg-red-500 hover:bg-red-400 text-white'
        }`}
        title={isRunning ? '暂停' : '开始'}
      >
        {isRunning ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="6,3 20,12 6,21" />
          </svg>
        )}
      </button>

      {/* Skip button - empty placeholder for alignment */}
      <div className="w-12 h-12" />
    </div>
  )
}
