<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStorage } from '@vueuse/core'
import { useAttendees } from '@/entities/attendee'
import { BikeAssembly } from '@/widgets/bike-assembly'
import { AttendeesPanel } from '@/widgets/attendees-panel'
import { TasksPanel } from '@/widgets/tasks-panel'
import { FinaleOverlay } from '@/widgets/finale'

const steps = useStorage('garage:steps', 0)
const finaleRef = ref<InstanceType<typeof FinaleOverlay> | null>(null)

function nextStep() {
  steps.value = Math.min(6, steps.value + 1)
}
function resetSteps() {
  steps.value = 0
}
function openFinale() {
  finaleRef.value?.openFinale()
}

const attendees = useAttendees()

const tasksPanelIsShown = computed(() => attendees.count > 0)
</script>

<template>
  <div class="min-h-[calc(100vh-4rem)] p-6 text-neutral-100 bg-neutral-900">
    <div class="max-w-6xl mx-auto grid gap-6 lg:grid-cols-2">
      <div class="space-y-6">
        <h1 class="text-2xl font-semibold">Garage — испытания</h1>
        <div class="rounded-2xl border border-neutral-800 bg-neutral-850/30 p-4 space-y-3">
          <div class="flex gap-2">
            <button
              @click="nextStep"
              class="px-4 py-2 rounded-xl bg-emerald-500 text-neutral-900 font-medium hover:bg-emerald-400"
            >
              Следующий шаг
            </button>
            <button
              @click="resetSteps"
              class="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-700"
            >
              Сбросить
            </button>
            <button
              @click="openFinale"
              class="ml-auto px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-700"
            >
              Финал
            </button>
          </div>
        </div>

        <TasksPanel v-if="tasksPanelIsShown" />
      </div>

      <div class="space-y-6">
        <BikeAssembly />
        <AttendeesPanel />
      </div>
    </div>

    <FinaleOverlay ref="finaleRef" />
  </div>
</template>
