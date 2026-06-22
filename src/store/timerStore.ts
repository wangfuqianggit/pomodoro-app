import { create } from 'zustand'

export type TimerMode = 'work' | 'shortBreak' | 'longBreak'

interface TimerState {
  mode: TimerMode
  timeRemaining: number
  isRunning: boolean
  pomodoroCount: number
  setMode: (mode: TimerMode) => void
  setTimeRemaining: (time: number) => void
  setIsRunning: (running: boolean) => void
  incrementPomodoroCount: () => void
  resetPomodoroCount: () => void
  reset: () => void
}

export const useTimerStore = create<TimerState>((set) => ({
  mode: 'work',
  timeRemaining: 25 * 60,
  isRunning: false,
  pomodoroCount: 0,
  setMode: (mode) => set({ mode, isRunning: false }),
  setTimeRemaining: (time) => set({ timeRemaining: time }),
  setIsRunning: (running) => set({ isRunning: running }),
  incrementPomodoroCount: () =>
    set((state) => ({ pomodoroCount: state.pomodoroCount + 1 })),
  resetPomodoroCount: () => set({ pomodoroCount: 0 }),
  reset: () =>
    set({
      mode: 'work',
      timeRemaining: 25 * 60,
      isRunning: false,
      pomodoroCount: 0,
    }),
}))
