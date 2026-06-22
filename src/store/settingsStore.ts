import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SettingsState {
  workDuration: number
  shortBreakDuration: number
  longBreakDuration: number
  longBreakInterval: number
  autoStartBreaks: boolean
  autoStartWork: boolean
  soundEnabled: boolean
  notificationEnabled: boolean
  setWorkDuration: (duration: number) => void
  setShortBreakDuration: (duration: number) => void
  setLongBreakDuration: (duration: number) => void
  setLongBreakInterval: (interval: number) => void
  setAutoStartBreaks: (auto: boolean) => void
  setAutoStartWork: (auto: boolean) => void
  setSoundEnabled: (enabled: boolean) => void
  setNotificationEnabled: (enabled: boolean) => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      workDuration: 25,
      shortBreakDuration: 5,
      longBreakDuration: 15,
      longBreakInterval: 4,
      autoStartBreaks: false,
      autoStartWork: false,
      soundEnabled: true,
      notificationEnabled: true,
      setWorkDuration: (duration) => set({ workDuration: duration }),
      setShortBreakDuration: (duration) => set({ shortBreakDuration: duration }),
      setLongBreakDuration: (duration) => set({ longBreakDuration: duration }),
      setLongBreakInterval: (interval) => set({ longBreakInterval: interval }),
      setAutoStartBreaks: (auto) => set({ autoStartBreaks: auto }),
      setAutoStartWork: (auto) => set({ autoStartWork: auto }),
      setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),
      setNotificationEnabled: (enabled) => set({ notificationEnabled: enabled }),
    }),
    { name: 'pomodoro-settings' }
  )
)
