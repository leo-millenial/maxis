<script setup lang="ts">
import { useAttendees, AttendeeItem } from '@/entities/attendee'
import { AddAttendeeForm } from '@/features/attendee-add'

const attendees = useAttendees()
</script>

<template>
  <div class="rounded-2xl border border-neutral-800 p-4 bg-neutral-850/30 space-y-3">
    <h2 class="font-medium">Присутствующие</h2>

    <AddAttendeeForm />

    <div class="flex items-center justify-between text-xs text-neutral-400 mt-1">
      <span>Всего: {{ attendees.count }}</span>
      <button
        @click="attendees.clear()"
        class="px-2 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 border border-neutral-700"
      >
        Очистить
      </button>
    </div>

    <ul class="divide-y divide-neutral-800">
      <AttendeeItem
        v-for="attendee in attendees.items"
        :key="attendee.id"
        :attendee
        @remove="attendees.remove(attendee.id)"
      />
    </ul>
  </div>
</template>
