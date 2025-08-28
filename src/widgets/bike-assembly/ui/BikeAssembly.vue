<script setup lang="ts">
import { computed } from 'vue'
import { useTasks } from '@/entities/task'

const tasks = useTasks()

const progress = computed(() => tasks.progress)

const pieces = computed(() => {
  const p = progress.value
  return {
    frontWheel: p >= 17,
    engine: p >= 33,
    rearWheel: p >= 50,
    handlebar: p >= 67,
    seat: p >= 83,
    exhaust: p >= 100,
  }
})
</script>

<template>
  <div class="relative w-full max-w-4xl mx-auto">
    <div
      class="h-48 sm:h-60 w-full rounded-2xl bg-gradient-to-b from-neutral-900 to-neutral-800 border border-neutral-700 shadow-inner overflow-hidden"
    />

    <div class="absolute inset-0 flex items-center justify-center">
      <div class="relative w-[600px] max-w-full h-48">

        <!-- Рама мотоцикла -->
        <svg class="absolute inset-0 w-full h-full" viewBox="0 0 600 200">
          <!-- Основная рама -->
          <path
            v-if="pieces.engine"
            d="M 120 160 L 480 160 L 450 120 L 150 120 Z"
            :stroke="pieces.engine ? '#10b981' : '#525252'"
            stroke-width="3"
            fill="none"
            class="transition-all duration-700"
          />
          <!-- Передняя вилка -->
          <line
            v-if="pieces.frontWheel"
            x1="120" y1="160" x2="100" y2="80"
            :stroke="pieces.handlebar ? '#10b981' : '#525252'"
            stroke-width="4"
            class="transition-all duration-700"
          />
          <!-- Задняя стойка -->
          <line
            v-if="pieces.rearWheel"
            x1="480" y1="160" x2="460" y2="120"
            :stroke="pieces.seat ? '#10b981' : '#525252'"
            stroke-width="4"
            class="transition-all duration-700"
          />
          <!-- Цепь -->
          <circle
            v-if="pieces.engine && pieces.rearWheel"
            cx="400" cy="160" r="15"
            stroke="#10b981"
            stroke-width="2"
            fill="none"
            stroke-dasharray="5,5"
            class="transition-all duration-700"
          />
        </svg>

        <!-- Переднее колесо -->
        <div
          class="absolute left-8 bottom-4 w-24 h-24 transition-all duration-700"
          :class="pieces.frontWheel ? 'scale-100 opacity-100' : 'scale-75 opacity-40'"
        >
          <div
            class="w-full h-full rounded-full border-4 relative"
            :class="pieces.frontWheel ? 'border-emerald-400 bg-neutral-800' : 'border-neutral-600 bg-neutral-900'"
          >
            <!-- Спицы колеса -->
            <div v-if="pieces.frontWheel" class="absolute inset-2 rounded-full border border-emerald-300">
              <div class="absolute top-1/2 left-0 right-0 h-px bg-emerald-300 transform -translate-y-1/2"></div>
              <div class="absolute left-1/2 top-0 bottom-0 w-px bg-emerald-300 transform -translate-x-1/2"></div>
              <div class="absolute inset-0 border border-emerald-300 rounded-full transform rotate-45"></div>
            </div>
            <!-- Центр колеса -->
            <div
              class="absolute top-1/2 left-1/2 w-4 h-4 rounded-full transform -translate-x-1/2 -translate-y-1/2"
              :class="pieces.frontWheel ? 'bg-emerald-400' : 'bg-neutral-600'"
            ></div>
          </div>
        </div>

        <!-- Заднее колесо -->
        <div
          class="absolute right-8 bottom-4 w-24 h-24 transition-all duration-700"
          :class="pieces.rearWheel ? 'scale-100 opacity-100' : 'scale-75 opacity-40'"
        >
          <div
            class="w-full h-full rounded-full border-4 relative"
            :class="pieces.rearWheel ? 'border-emerald-400 bg-neutral-800' : 'border-neutral-600 bg-neutral-900'"
          >
            <!-- Спицы колеса -->
            <div v-if="pieces.rearWheel" class="absolute inset-2 rounded-full border border-emerald-300">
              <div class="absolute top-1/2 left-0 right-0 h-px bg-emerald-300 transform -translate-y-1/2"></div>
              <div class="absolute left-1/2 top-0 bottom-0 w-px bg-emerald-300 transform -translate-x-1/2"></div>
              <div class="absolute inset-0 border border-emerald-300 rounded-full transform rotate-45"></div>
            </div>
            <!-- Центр колеса -->
            <div
              class="absolute top-1/2 left-1/2 w-4 h-4 rounded-full transform -translate-x-1/2 -translate-y-1/2"
              :class="pieces.rearWheel ? 'bg-emerald-400' : 'bg-neutral-600'"
            ></div>
          </div>
        </div>

        <!-- Двигатель -->
        <div
          class="absolute left-1/2 bottom-8 w-32 h-20 transform -translate-x-1/2 transition-all duration-700"
          :class="pieces.engine ? 'scale-100 opacity-100' : 'scale-90 opacity-40'"
        >
          <div
            class="w-full h-full rounded-lg border-4 relative"
            :class="pieces.engine ? 'border-emerald-400 bg-gradient-to-b from-neutral-700 to-neutral-800' : 'border-neutral-600 bg-neutral-900'"
          >
            <!-- Детали двигателя -->
            <div v-if="pieces.engine" class="absolute inset-2 space-y-1">
              <div class="h-2 bg-emerald-300 rounded"></div>
              <div class="h-2 bg-emerald-400 rounded"></div>
              <div class="h-2 bg-emerald-300 rounded"></div>
            </div>
            <!-- Иконка двигателя -->
            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl">
              {{ pieces.engine ? '⚙️' : '⬜' }}
            </div>
          </div>
        </div>

        <!-- Руль -->
        <div
          class="absolute left-16 top-4 w-32 h-8 transition-all duration-700"
          :class="pieces.handlebar ? 'scale-100 opacity-100' : 'scale-90 opacity-40'"
        >
          <div
            class="w-full h-full rounded-full border-4 relative"
            :class="pieces.handlebar ? 'border-emerald-400 bg-neutral-800' : 'border-neutral-600 bg-neutral-900'"
          >
            <!-- Ручки руля -->
            <div v-if="pieces.handlebar" class="absolute -left-2 top-1/2 w-4 h-4 bg-emerald-400 rounded-full transform -translate-y-1/2"></div>
            <div v-if="pieces.handlebar" class="absolute -right-2 top-1/2 w-4 h-4 bg-emerald-400 rounded-full transform -translate-y-1/2"></div>
            <!-- Центр руля -->
            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg">
              {{ pieces.handlebar ? '🚲' : '━' }}
            </div>
          </div>
        </div>

        <!-- Сиденье -->
        <div
          class="absolute left-1/2 top-8 w-36 h-10 transform -translate-x-1/2 transition-all duration-700"
          :class="pieces.seat ? 'scale-100 opacity-100' : 'scale-90 opacity-40'"
        >
          <div
            class="w-full h-full rounded-full border-4 relative"
            :class="pieces.seat ? 'border-emerald-400 bg-gradient-to-r from-neutral-700 to-neutral-600' : 'border-neutral-600 bg-neutral-900'"
          >
            <!-- Текстура сиденья -->
            <div v-if="pieces.seat" class="absolute inset-1 rounded-full bg-gradient-to-r from-emerald-900/20 to-emerald-800/20"></div>
            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg">
              {{ pieces.seat ? '🪑' : '▬' }}
            </div>
          </div>
        </div>

        <!-- Выхлопная труба -->
        <div
          class="absolute right-16 bottom-16 w-20 h-8 transition-all duration-700"
          :class="pieces.exhaust ? 'scale-100 opacity-100' : 'scale-90 opacity-40'"
        >
          <div
            class="w-full h-full rounded-lg border-4 relative"
            :class="pieces.exhaust ? 'border-emerald-400 bg-gradient-to-r from-neutral-600 to-neutral-500' : 'border-neutral-600 bg-neutral-900'"
          >
            <!-- Дым из выхлопной трубы -->
            <div v-if="pieces.exhaust" class="absolute -top-2 right-0 text-xs opacity-60 animate-pulse">💨</div>
            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              {{ pieces.exhaust ? '🚬' : '▭' }}
            </div>
          </div>
        </div>

        <!-- Фары -->
        <div
          v-if="pieces.frontWheel"
          class="absolute left-4 top-12 w-6 h-6 rounded-full border-2 border-yellow-400 bg-yellow-300/80 transition-all duration-700"
        >
          <div class="absolute inset-1 rounded-full bg-yellow-200 animate-pulse"></div>
        </div>

      </div>
    </div>

    <div class="mt-6">
      <div class="flex items-center justify-between mb-2">
        <span class="text-sm text-neutral-300">Сборка мотоцикла</span>
        <span class="text-sm font-medium text-neutral-100">{{ progress }}%</span>
      </div>
      <div class="w-full bg-neutral-700 rounded-full h-3 overflow-hidden">
        <div
          class="h-3 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-500"
          :style="{ width: progress + '%' }"
        />
      </div>
    </div>
  </div>
</template>
