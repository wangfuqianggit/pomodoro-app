import { useTimer } from '../../hooks/useTimer'
import { formatTime } from '../../utils/formatTime'

const modeColors = {
  work: { ring: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)', text: '#EF4444' },
  shortBreak: { ring: '#22C55E', bg: 'rgba(34, 197, 94, 0.1)', text: '#22C55E' },
  longBreak: { ring: '#3B82F6', bg: 'rgba(59, 130, 246, 0.1)', text: '#3B82F6' },
}

const modeLabels = {
  work: '专注',
  shortBreak: '短休息',
  longBreak: '长休息',
}

export function TimerDisplay() {
  const { mode, timeRemaining, progress } = useTimer()
  const colors = modeColors[mode]

  const size = 240
  const strokeWidth = 8
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - progress)

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Mode label */}
      <span
        className="text-sm font-medium px-3 py-1 rounded-full"
        style={{ color: colors.text, backgroundColor: colors.bg }}
      >
        {modeLabels[mode]}
      </span>

      {/* Circular timer */}
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#1F2937"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={colors.ring}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-linear"
          />
        </svg>
        {/* Time text overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-mono font-bold text-white tracking-wider">
            {formatTime(timeRemaining)}
          </span>
        </div>
      </div>
    </div>
  )
}
