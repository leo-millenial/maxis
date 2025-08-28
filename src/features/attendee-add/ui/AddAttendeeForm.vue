<script setup lang="ts">
import { ref } from 'vue'
import { useAttendees } from '@/entities/attendee/model/store'

const attendees = useAttendees()
const input = ref('')

function submit() {
  if (!input.value) return
  attendees.addMany(input.value)
  input.value = ''
}
</script>

<template>
  <form @submit.prevent="submit" class="flex gap-2">
    <input
      v-model.trim="input"
      type="text"
      placeholder="Имя или несколько через запятую"
      class="flex-1 px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 focus:outline-none"
    />
    <button
      class="px-4 py-2 rounded-xl bg-emerald-500 text-neutral-900 font-medium hover:bg-emerald-400"
    >
      Добавить
    </button>
  </form>
</template>
