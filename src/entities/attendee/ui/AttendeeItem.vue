<script setup lang="ts">
import type { Attendee } from '@/entities/attendee/model/store'
const props = defineProps<{ attendee: Attendee }>()
const emit = defineEmits<{ remove: [id: string] }>()
</script>

<template>
  <li class="py-2 flex items-center gap-3">
    <div
      class="h-8 w-8 grid place-items-center rounded-full bg-neutral-800 border border-neutral-700"
    >
      👤
    </div>
    <div class="flex-1 min-w-0">
      <p class="text-sm font-medium truncate">{{ props.attendee.name }}</p>
    </div>
    <button
      @click="emit('remove', props.attendee.id)"
      class="px-3 py-1.5 text-sm rounded-lg bg-neutral-800 hover:bg-neutral-700 border border-neutral-700"
    >
      Удалить
    </button>
  </li>
</template>
