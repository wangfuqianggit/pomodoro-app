import { useEffect, useRef, useCallback } from 'react'
import { useTimerStore } from '../store/timerStore'
import { useSettingsStore } from '../store/settingsStore'
import { useTaskStore } from '../store/taskStore'
import { useHistoryStore } from '../store/historyStore'
import { playAlarm } from '../utils/sound'

declare global {
  interface Window {
    electronAPI?: {
      showNotification: (title: string, body: string) => void
      minimizeToTray: () => void
    }
  }
}

export function useTimer() {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const {
    mode,
    timeRemaining,
    isRunning,
    pomodoroCount,
    setTimeRemaining,
    setIsRunning,
    incrementPomodoroCount,
    setMode,
  } = useTimerStore()

  const settings = useSettingsStore()
  const { activeTaskId, incrementTaskPomodoro } = useTaskStore()
  const { addRecord } = useHistoryStore()

  const getTotalSeconds = useCallback(
    (m: typeof mode) => {
      switch (m) {
        case 'work':
          return settings.workDuration * 60
        case 'shortBreak':
          return settings.shortBreakDuration * 60
        case 'longBreak':
          return settings.longBreakDuration * 60
      }
    },
    [settings.workDuration, settings.shortBreakDuration, settings.longBreakDuration]
  )

  const handleComplete = useCallback(() => {
    setIsRunning(false)

    // Play sound
    if (settings.soundEnabled) {
      playAlarm()
    }

    // Record to history
    const activeTask = useTaskStore.getState().tasks.find(
      (t) => t.id === activeTaskId
    )
    addRecord({
      mode,
      duration: getTotalSeconds(mode),
      completedAt: Date.now(),
      taskId: activeTaskId,
      taskTitle: activeTask?.title ?? null,
    })

    if (mode === 'work') {
      incrementPomodoroCount()
      if (activeTaskId) {
        incrementTaskPomodoro(activeTaskId)
      }

      // Determine next mode
      const newCount = pomodoroCount + 1
      if (newCount % settings.longBreakInterval === 0) {
        setMode('longBreak')
        setTimeRemaining(getTotalSeconds('longBreak'))
        if (settings.autoStartBreaks) setIsRunning(true)
      } else {
        setMode('shortBreak')
        setTimeRemaining(getTotalSeconds('shortBreak'))
        if (settings.autoStartBreaks) setIsRunning(true)
      }

      // Notification
      if (settings.notificationEnabled) {
        if (window.electronAPI) {
          window.electronAPI.showNotification(
            '🍅 番茄钟完成！',
            '干得好！该休息一下了。'
          )
        }
      }
    } else {
      // Break complete → back to work
      setMode('work')
      setTimeRemaining(getTotalSeconds('work'))
      if (settings.autoStartWork) setIsRunning(true)

      if (settings.notificationEnabled) {
        if (window.electronAPI) {
          window.electronAPI.showNotification(
            '☕ 休息结束！',
            '准备好开始下一个番茄钟了吗？'
          )
        }
      }
    }
  }, [
    mode, pomodoroCount, activeTaskId, settings,
    setIsRunning, addRecord, incrementPomodoroCount,
    incrementTaskPomodoro, setMode, setTimeRemaining, getTotalSeconds,
  ])

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        const current = useTimerStore.getState().timeRemaining
        if (current <= 1) {
          setTimeRemaining(0)
          if (intervalRef.current) clearInterval(intervalRef.current)
          handleComplete()
        } else {
          setTimeRemaining(current - 1)
        }
      }, 1000)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isRunning, handleComplete, setTimeRemaining])

  // Update time when settings change while timer is not running
  useEffect(() => {
    if (!isRunning) {
      setTimeRemaining(getTotalSeconds(mode))
    }
  }, [settings.workDuration, settings.shortBreakDuration, settings.longBreakDuration])

  const start = () => setIsRunning(true)
  const pause = () => setIsRunning(false)
  const toggle = () => setIsRunning(!isRunning)

  const reset = () => {
    setIsRunning(false)
    setTimeRemaining(getTotalSeconds(mode))
  }

  const switchMode = (newMode: typeof mode) => {
    setIsRunning(false)
    setMode(newMode)
    setTimeRemaining(getTotalSeconds(newMode))
  }

  const progress = 1 - timeRemaining / getTotalSeconds(mode)

  return {
    mode,
    timeRemaining,
    isRunning,
    pomodoroCount,
    progress,
    start,
    pause,
    toggle,
    reset,
    switchMode,
  }
}
