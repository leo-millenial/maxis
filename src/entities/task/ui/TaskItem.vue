<script setup lang="ts">
import type { Task } from '@/entities/task/model/store'
import { useAttendees } from '@/entities/attendee/model/store'

const props = defineProps<{ task: Task }>()
const emit = defineEmits<{
  toggle: [id: string]
  assign: [payload: { id: string; askedById?: string }]
  remove: [id: string]
}>()

const attendees = useAttendees()
</script>

<template>
  <li class="flex items-center gap-3 p-2 rounded-xl hover:bg-neutral-800/60">
    <input
      type="checkbox"
      :checked="props.task.done"
      @change="emit('toggle', props.task.id)"
      class="h-4 w-4 rounded accent-emerald-500"
    />

    <div class="flex-1 min-w-0">
      <p class="text-sm truncate" :class="props.task.done ? 'line-through text-neutral-400' : ''">
        {{ props.task.title }}
      </p>
      <p class="text-xs text-neutral-400">
        Вопрос: {{ attendees.items?.find((a) => a.id === props.task.askedById)?.name || '—' }}
      </p>
    </div>

    <select
      :value="props.task.askedById || ''"
      @change="
        emit('assign', {
          id: props.task.id,
          askedById: ($event.target as HTMLSelectElement).value || undefined,
        })
      "
      class="px-2 py-1 rounded-lg bg-neutral-800 border border-neutral-700 text-sm"
    >
      <option value="">— кто задал? —</option>
      <option v-for="a in attendees.items" :key="a.id" :value="a.id">{{ a.name }}</option>
    </select>

    <button
      @click="emit('remove', props.task.id)"
      class="px-3 py-1.5 text-sm rounded-lg bg-neutral-800 hover:bg-neutral-700 border border-neutral-700"
    >
      Удалить
    </button>
  </li>
</template>
