import { useTaskStore } from '../../store/taskStore'
import type { Task } from '../../store/taskStore'

function TaskItem({ task }: { task: Task }) {
  const { toggleTask, removeTask, setActiveTask, activeTaskId } = useTaskStore()
  const isActive = activeTaskId === task.id

  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
        isActive ? 'bg-red-500/10 border border-red-500/30' : 'bg-gray-800/50 hover:bg-gray-800'
      }`}
    >
      {/* Checkbox */}
      <button
        onClick={() => toggleTask(task.id)}
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
          task.completed
            ? 'bg-green-500 border-green-500'
            : 'border-gray-600 hover:border-gray-400'
        }`}
      >
        {task.completed && (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
            <polyline points="20,6 9,17 4,12" />
          </svg>
        )}
      </button>

      {/* Title and progress */}
      <div
        className={`flex-1 min-w-0 cursor-pointer ${task.completed ? 'line-through text-gray-500' : 'text-white'}`}
        onClick={() => setActiveTask(isActive ? null : task.id)}
      >
        <div className="text-sm truncate">{task.title}</div>
        <div className="text-xs text-gray-500 mt-0.5">
          🍅 {task.pomodoroCount}/{task.pomodoroTarget}
        </div>
      </div>

      {/* Active indicator */}
      {isActive && (
        <span className="text-xs text-red-400 font-medium flex-shrink-0">进行中</span>
      )}

      {/* Delete button */}
      <button
        onClick={() => removeTask(task.id)}
        className="text-gray-600 hover:text-red-400 flex-shrink-0 transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}

export function TaskList() {
  const { tasks } = useTaskStore()

  if (tasks.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        <p className="text-2xl mb-2">📝</p>
        <p className="text-sm">还没有任务，添加一个吧！</p>
      </div>
    )
  }

  const activeTasks = tasks.filter((t) => !t.completed)
  const completedTasks = tasks.filter((t) => t.completed)

  return (
    <div className="space-y-2">
      {activeTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
      {completedTasks.length > 0 && (
        <>
          <div className="text-xs text-gray-500 uppercase tracking-wider pt-2">
            已完成 ({completedTasks.length})
          </div>
          {completedTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </>
      )}
    </div>
  )
}
