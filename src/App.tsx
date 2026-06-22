import { useState } from 'react'
import { TimerDisplay } from './components/Timer/TimerDisplay'
import { TimerControls } from './components/Timer/TimerControls'
import { TimerModeSelector } from './components/Timer/TimerModeSelector'
import { TodayStats } from './components/Statistics/TodayStats'
import { TaskInput } from './components/Task/TaskInput'
import { TaskList } from './components/Task/TaskList'
import { HistoryList } from './components/History/HistoryList'
import { SettingsPanel } from './components/Settings/SettingsPanel'
import { useTimer } from './hooks/useTimer'

type Tab = 'timer' | 'tasks' | 'history' | 'settings'

const tabs: { key: Tab; label: string; icon: string }[] = [
  { key: 'timer', label: '计时', icon: '⏱' },
  { key: 'tasks', label: '任务', icon: '📋' },
  { key: 'history', label: '历史', icon: '📊' },
  { key: 'settings', label: '设置', icon: '⚙️' },
]

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('timer')
  const { pomodoroCount } = useTimer()

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* Drag region for Electron */}
      <div className="h-8 w-full drag-region" />

      {/* Main content */}
      <div className="flex-1 flex flex-col px-4 pb-4">
        {activeTab === 'timer' && (
          <div className="flex-1 flex flex-col items-center justify-center gap-8">
            <TimerModeSelector />
            <TimerDisplay />
            <TimerControls />
            <TodayStats />
            <div className="flex items-center gap-1.5">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    i < pomodoroCount % 4 ? 'bg-red-500' : 'bg-gray-700'
                  }`}
                />
              ))}
              <span className="text-xs text-gray-500 ml-2">
                第 {pomodoroCount + 1} 个
              </span>
            </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="flex-1 flex flex-col gap-4">
            <h2 className="text-lg font-semibold">任务列表</h2>
            <TaskInput />
            <div className="flex-1 overflow-y-auto">
              <TaskList />
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="flex-1 flex flex-col gap-4">
            <h2 className="text-lg font-semibold">历史记录</h2>
            <div className="flex-1 overflow-y-auto">
              <HistoryList />
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="flex-1 flex flex-col gap-4">
            <h2 className="text-lg font-semibold">设置</h2>
            <div className="flex-1 overflow-y-auto">
              <SettingsPanel />
            </div>
          </div>
        )}
      </div>

      {/* Bottom tab bar */}
      <div className="flex border-t border-gray-800 bg-gray-900/80 backdrop-blur-sm">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 flex flex-col items-center py-3 gap-1 transition-colors ${
              activeTab === tab.key
                ? 'text-red-400'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <span className="text-lg">{tab.icon}</span>
            <span className="text-xs">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default App
