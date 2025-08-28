<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAttendees } from '@/entities/attendee'
import { useTasks } from '@/entities/task'
import { BikeAssembly } from '@/widgets/bike-assembly'
import { AttendeesPanel } from '@/widgets/attendees-panel'
import { TasksPanel } from '@/widgets/tasks-panel'
import { FinaleOverlay } from '@/widgets/finale'

const finaleRef = ref<InstanceType<typeof FinaleOverlay> | null>(null)

function openFinale() {
  finaleRef.value?.openFinale()
}

const attendees = useAttendees()
const tasks = useTasks()

const tasksPanelIsShown = computed(() => attendees.count > 0)
const finalIsDisabled = computed(() => tasks.progress !== 100)
</script>

<template>
  <div class="h-100vh p-6 text-neutral-100 bg-neutral-900">
    <div class="max-w-6xl mx-auto grid gap-6 lg:grid-cols-2">
      <div class="space-y-6">
        <h1 class="text-2xl font-semibold">Garage — испытания</h1>
        <div
          v-if="tasksPanelIsShown"
          class="rounded-2xl border border-neutral-800 bg-neutral-850/30 p-4 space-y-3"
        >
          <div class="flex gap-2">
            <button
              @click="openFinale"
              :disabled="finalIsDisabled"
              :class="finalIsDisabled ? 'opacity-50 cursor-not-allowed' : ''"
              class="ml-auto px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-700"
            >
              Финал
            </button>
          </div>
        </div>

        <TasksPanel v-if="tasksPanelIsShown" />
      </div>

      <div class="space-y-6">
        <BikeAssembly v-if="tasksPanelIsShown" />
        <AttendeesPanel />
      </div>
    </div>

    <FinaleOverlay ref="finaleRef" />
  </div>
</template>
