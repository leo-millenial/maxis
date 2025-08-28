<script setup lang="ts">
import { ref } from 'vue'
import { useTasks } from '@/entities/task'
import { useAttendees } from '@/entities/attendee'

const tasks = useTasks()
const attendees = useAttendees()

const title = ref('')
const askedById = ref<string | ''>('')

function submit() {
  if (!title.value) return
  tasks.add(title.value, askedById.value || undefined)
  title.value = ''
  askedById.value = ''
}
</script>

<template>
  <form @submit.prevent="submit" class="grid grid-cols-1 sm:grid-cols-6 gap-2">
    <input
      v-model.trim="title"
      type="text"
      placeholder="Новая задача..."
      class="sm:col-span-3 px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 focus:outline-none"
    />
    <select
      v-model="askedById"
      class="sm:col-span-2 px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-sm"
    >
      <option value="">— кто задал? —</option>
      <option v-for="a in attendees.items" :key="a.id" :value="a.id" class="truncate">
        {{ a.name }}
      </option>
    </select>
    <button
      class="px-4 py-2 rounded-xl bg-emerald-500 text-neutral-900 font-medium hover:bg-emerald-400"
    >
      +
    </button>
  </form>
</template>
