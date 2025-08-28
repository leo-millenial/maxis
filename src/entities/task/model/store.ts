import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useStorage } from '@vueuse/core'

export type Task = {
  id: string
  title: string
  done: boolean
  askedById?: string
}

function genId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

export const useTasks = defineStore('tasks', () => {
  const list = useStorage<Task[]>('tasks:list', [])

  const count = computed(() => list.value.length)
  const doneCount = computed(() => list.value.filter((t) => t.done).length)
  const progress = computed(() =>
    count.value === 0 ? 0 : Math.round((doneCount.value / count.value) * 100),
  )
  const items = computed(() => list.value)

  function add(title: string, askedById?: string) {
    const v = title.trim()
    if (!v) return
    list.value.push({ id: genId(), title: v, done: false, askedById })
  }
  function toggle(id: string) {
    const t = list.value.find((x) => x.id === id)
    if (t) t.done = !t.done
  }
  function assign(id: string, askedById?: string) {
    const t = list.value.find((x) => x.id === id)
    if (t) t.askedById = askedById
  }
  function remove(id: string) {
    list.value = list.value.filter((t) => t.id !== id)
  }
  function clear() {
    list.value = []
  }

  return { items, count, doneCount, progress, add, toggle, assign, remove, clear }
})
