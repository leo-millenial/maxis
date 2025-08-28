import { useStorage } from '@vueuse/core'
import { computed } from 'vue'
import { defineStore } from 'pinia'

export type Attendee = { id: string; name: string }

function genId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

export const useAttendees = defineStore('attendees', () => {
  const list = useStorage<Attendee[]>('attendees:list', [] satisfies Attendee[])
  const count = computed(() => list.value.length)
  const items = computed(() => list.value)

  function addMany(input: string): void {
    const names = input
      .split(',')
      .map((n) => n.trim())
      .filter(Boolean)
    for (const name of names) {
      list.value.push({ id: genId(), name })
    }
  }

  function addOne(name: string): void {
    const v = name.trim()
    if (!v) return
    list.value.push({ id: genId(), name: v })
  }

  function remove(id: string): void {
    list.value = list.value.filter((a) => a.id !== id)
  }

  function clear(): void {
    list.value = []
  }

  return { list, items, count, addMany, addOne, remove, clear }
})
