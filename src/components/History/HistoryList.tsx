import { useHistoryStore } from '../../store/historyStore'

const modeLabels = {
  work: '🍅 专注',
  shortBreak: '☕ 短休息',
  longBreak: '🌴 长休息',
}

const modeColors = {
  work: 'text-red-400',
  shortBreak: 'text-green-400',
  longBreak: 'text-blue-400',
}

export function HistoryList() {
  const { records, clearHistory } = useHistoryStore()

  if (records.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        <p className="text-2xl mb-2">📊</p>
        <p className="text-sm">完成第一个番茄钟后，记录会出现在这里</p>
      </div>
    )
  }

  // Show most recent records first, grouped by date
  const sorted = [...records].reverse().slice(0, 50)

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">最近 50 条记录</span>
        <button
          onClick={() => {
            if (confirm('确定清空所有历史记录？')) clearHistory()
          }}
          className="text-xs text-gray-500 hover:text-red-400 transition-colors"
        >
          清空
        </button>
      </div>
      {sorted.map((record) => {
        const date = new Date(record.completedAt)
        const timeStr = date.toLocaleTimeString('zh-CN', {
          hour: '2-digit',
          minute: '2-digit',
        })
        const dateStr = date.toLocaleDateString('zh-CN', {
          month: 'short',
          day: 'numeric',
        })
        const durationMin = Math.round(record.duration / 60)

        return (
          <div
            key={record.id}
            className="flex items-center gap-3 p-2 bg-gray-800/50 rounded-lg"
          >
            <span className={`text-sm ${modeColors[record.mode]}`}>
              {modeLabels[record.mode]}
            </span>
            <span className="text-xs text-gray-400 flex-1">
              {durationMin} 分钟
              {record.taskTitle && (
                <span className="text-gray-500"> · {record.taskTitle}</span>
              )}
            </span>
            <span className="text-xs text-gray-600">
              {dateStr} {timeStr}
            </span>
          </div>
        )
      })}
    </div>
  )
}
