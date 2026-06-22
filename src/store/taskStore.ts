import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Task {
  id: string
  title: string
  completed: boolean
  pomodoroCount: number
  pomodoroTarget: number
  createdAt: number
}

interface TaskState {
  tasks: Task[]
  activeTaskId: string | null
  addTask: (title: string, pomodoroTarget?: number) => void
  removeTask: (id: string) => void
  toggleTask: (id: string) => void
  setActiveTask: (id: string | null) => void
  incrementTaskPomodoro: (id: string) => void
  updateTaskTarget: (id: string, target: number) => void
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [],
      activeTaskId: null,
      addTask: (title, pomodoroTarget = 1) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              id: Date.now().toString(),
              title,
              completed: false,
              pomodoroCount: 0,
              pomodoroTarget,
              createdAt: Date.now(),
            },
          ],
        })),
      removeTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
          activeTaskId: state.activeTaskId === id ? null : state.activeTaskId,
        })),
      toggleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, completed: !t.completed } : t
          ),
        })),
      setActiveTask: (id) => set({ activeTaskId: id }),
      incrementTaskPomodoro: (id) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id
              ? { ...t, pomodoroCount: t.pomodoroCount + 1 }
              : t
          ),
        })),
      updateTaskTarget: (id, target) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, pomodoroTarget: target } : t
          ),
        })),
    }),
    { name: 'pomodoro-tasks' }
  )
)
