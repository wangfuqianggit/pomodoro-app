import { useState } from 'react'
import { useTaskStore } from '../../store/taskStore'

export function TaskInput() {
  const [title, setTitle] = useState('')
  const [target, setTarget] = useState(1)
  const { addTask } = useTaskStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    addTask(title.trim(), target)
    setTitle('')
    setTarget(1)
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="添加任务..."
        className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-500"
      />
      <input
        type="number"
        value={target}
        onChange={(e) => setTarget(Math.max(1, parseInt(e.target.value) || 1))}
        min={1}
        max={20}
        className="w-14 bg-gray-800 border border-gray-700 rounded-lg px-2 py-2 text-sm text-white text-center focus:outline-none focus:border-gray-500"
        title="目标番茄数"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-red-500 hover:bg-red-400 text-white rounded-lg text-sm font-medium transition-colors"
      >
        添加
      </button>
    </form>
  )
}
