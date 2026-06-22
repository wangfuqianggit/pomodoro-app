import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { TimerMode } from './timerStore'

export interface HistoryRecord {
  id: string
  mode: TimerMode
  duration: number
  completedAt: number
  taskId: string | null
  taskTitle: string | null
}

interface HistoryState {
  records: HistoryRecord[]
  addRecord: (record: Omit<HistoryRecord, 'id'>) => void
  clearHistory: () => void
  getTodayRecords: () => HistoryRecord[]
  getTodayPomodoroCount: () => number
  getTodayFocusMinutes: () => number
}

function isToday(timestamp: number): boolean {
  const date = new Date(timestamp)
  const today = new Date()
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  )
}

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set, get) => ({
      records: [],
      addRecord: (record) =>
        set((state) => ({
          records: [
            ...state.records,
            { ...record, id: Date.now().toString() },
          ],
        })),
      clearHistory: () => set({ records: [] }),
      getTodayRecords: () => get().records.filter((r) => isToday(r.completedAt)),
      getTodayPomodoroCount: () =>
        get()
          .records.filter((r) => isToday(r.completedAt) && r.mode === 'work')
          .length,
      getTodayFocusMinutes: () =>
        Math.round(
          get()
            .records.filter((r) => isToday(r.completedAt) && r.mode === 'work')
            .reduce((sum, r) => sum + r.duration, 0) / 60
        ),
    }),
    { name: 'pomodoro-history' }
  )
)
