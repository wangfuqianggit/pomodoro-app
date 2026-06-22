import { useHistoryStore } from '../../store/historyStore'
import { useTimer } from '../../hooks/useTimer'

export function TodayStats() {
  const { pomodoroCount } = useTimer()
  const { getTodayPomodoroCount, getTodayFocusMinutes } = useHistoryStore()

  const todayPomodoros = getTodayPomodoroCount() + pomodoroCount
  const focusMinutes = getTodayFocusMinutes()

  return (
    <div className="flex gap-4 justify-center">
      <div className="text-center">
        <div className="text-2xl font-bold text-red-400">{todayPomodoros}</div>
        <div className="text-xs text-gray-500">今日番茄</div>
      </div>
      <div className="w-px bg-gray-700" />
      <div className="text-center">
        <div className="text-2xl font-bold text-orange-400">{focusMinutes}</div>
        <div className="text-xs text-gray-500">专注分钟</div>
      </div>
    </div>
  )
}
