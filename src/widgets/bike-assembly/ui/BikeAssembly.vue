<script setup lang="ts">
import { computed } from 'vue'
import { useStorage } from '@vueuse/core'

const steps = useStorage('garage:steps', 0)
const total = 6
const progress = computed(() => Math.min(100, Math.round((steps.value / total) * 100)))
const pieces = computed(() => ({
  frontWheel: steps.value >= 1,
  engine: steps.value >= 2,
  rearWheel: steps.value >= 3,
  handlebar: steps.value >= 4,
  seat: steps.value >= 5,
  exhaust: steps.value >= 6,
}))
</script>

<template>
  <div class="relative w-full max-w-3xl mx-auto">
    <div
      class="h-40 sm:h-52 w-full rounded-2xl bg-gradient-to-b from-neutral-900 to-neutral-800 border border-neutral-700 shadow-inner"
    />

    <div class="absolute inset-0 flex items-center justify-center">
      <div class="relative w-[520px] max-w-full aspect-[16/6]">
        <div class="absolute inset-0 border-2 border-neutral-600/60 rounded-xl" />

        <div
          class="absolute left-6 bottom-2 w-20 h-20 rounded-full border-4"
          :class="pieces.frontWheel ? 'border-emerald-400' : 'border-neutral-600'"
        >
          <div v-if="pieces.frontWheel" class="animate-pulse text-center mt-6">🛞</div>
        </div>
        <div
          class="absolute right-6 bottom-2 w-20 h-20 rounded-full border-4"
          :class="pieces.rearWheel ? 'border-emerald-400' : 'border-neutral-600'"
        >
          <div v-if="pieces.rearWheel" class="animate-pulse text-center mt-6">🛞</div>
        </div>

        <div
          class="absolute left-1/2 -translate-x-1/2 bottom-6 w-28 h-16 rounded-lg border-4 flex items-center justify-center"
          :class="pieces.engine ? 'border-emerald-400' : 'border-neutral-600'"
        >
          <span v-if="pieces.engine" class="text-2xl">⚙️</span>
        </div>

        <div
          class="absolute left-1/4 -translate-x-1/2 top-6 w-24 h-6 rounded border-4 flex items-center justify-center"
          :class="pieces.handlebar ? 'border-emerald-400' : 'border-neutral-600'"
        >
          <span v-if="pieces.handlebar">🕹️</span>
        </div>

        <div
          class="absolute left-1/2 -translate-x-1/2 top-10 w-28 h-6 rounded-full border-4 flex items-center justify-center"
          :class="pieces.seat ? 'border-emerald-400' : 'border-neutral-600'"
        >
          <span v-if="pieces.seat">🪑</span>
        </div>

        <div
          class="absolute right-24 bottom-10 w-16 h-6 rounded border-4 flex items-center justify-center"
          :class="pieces.exhaust ? 'border-emerald-400' : 'border-neutral-600'"
        >
          <span v-if="pieces.exhaust">📦</span>
        </div>
      </div>
    </div>

    <div class="mt-4">
      <div class="flex items-center justify-between mb-1">
        <span class="text-sm text-neutral-300">Сборка мотоцикла</span>
        <span class="text-sm font-medium text-neutral-100">{{ progress }}%</span>
      </div>
      <div class="w-full bg-neutral-700 rounded-full h-2 overflow-hidden">
        <div
          class="h-2 rounded-full bg-emerald-400 transition-all"
          :style="{ width: progress + '%' }"
        />
      </div>
    </div>
  </div>
</template>
