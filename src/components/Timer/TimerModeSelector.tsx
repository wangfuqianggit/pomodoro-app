import { useTimer } from '../../hooks/useTimer'
import type { TimerMode } from '../../store/timerStore'

const modes: { key: TimerMode; label: string }[] = [
  { key: 'work', label: '专注' },
  { key: 'shortBreak', label: '短休息' },
  { key: 'longBreak', label: '长休息' },
]

export function TimerModeSelector() {
  const { mode, switchMode, isRunning } = useTimer()

  return (
    <div className="flex bg-gray-800 rounded-xl p-1 gap-1">
      {modes.map((m) => (
        <button
          key={m.key}
          onClick={() => switchMode(m.key)}
          disabled={isRunning}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            mode === m.key
              ? m.key === 'work'
                ? 'bg-red-500/20 text-red-400'
                : m.key === 'shortBreak'
                ? 'bg-green-500/20 text-green-400'
                : 'bg-blue-500/20 text-blue-400'
              : 'text-gray-400 hover:text-gray-200'
          } ${isRunning ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          {m.label}
        </button>
      ))}
    </div>
  )
}
