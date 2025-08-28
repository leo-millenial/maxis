<script setup lang="ts">
import { computed, ref } from 'vue'
import { useAttendees } from '@/entities/attendee/model/store'
import { useIntervalFn, useToggle } from '@vueuse/core'

const companyName = import.meta.env.VITE_COMPANY_NAME

const attendees = useAttendees()

const [shown, toggle] = useToggle(false)

// 3) Плавающие «чипы» с именами
const floating = ref<{ id: string; name: string; x: number; y: number; s: number }[]>([])

function randomFloaters() {
  floating.value = attendees.items.map((attendee) => ({
    id: attendee.id,
    name: attendee.name,
    x: Math.random() * 90 + 5, // проценты по X
    y: Math.random() * 70 + 10, // проценты по Y
    s: Math.random() * 0.6 + 0.8, // scale
  }))
}

// 4) Лёгкое «оживление» — периодически сдвигаем позиции
useIntervalFn(() => {
  if (!shown.value || floating.value.length === 0) return
  floating.value = floating.value.map((f) => ({
    ...f,
    x: clamp(f.x + (Math.random() - 0.5) * 4, 2, 98),
    y: clamp(f.y + (Math.random() - 0.5) * 3, 5, 95),
  }))
}, 1500)

function clamp(n: number, a: number, b: number) {
  return Math.min(b, Math.max(a, n))
}

// 5) «Подиум» — все участники с разными позициями
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]]
  }
  return shuffled
}

const podium = computed(() => {
  const shuffled = shuffleArray(attendees.items)
  return shuffled.map((attendee, index) => ({
    ...attendee,
    position: index + 1,
    isWinner: index < 3, // первые 3 места - победители
    height: index === 0 ? 'h-40' : index === 1 ? 'h-32' : index === 2 ? 'h-28' : 'h-20',
  }))
})

function openFinale() {
  randomFloaters()
  toggle(true)
}
function closeFinale() {
  toggle(false)
}

defineExpose({ openFinale, closeFinale })
</script>

<template>
  <transition name="fade">
    <div v-if="shown" class="fixed inset-0 z-[60] bg-neutral-950/95 text-neutral-100">
      <!-- Слой с плавающими именами -->
      <div class="absolute inset-0 pointer-events-none">
        <transition-group name="chip" tag="div">
          <div
            v-for="f in floating"
            :key="f.id"
            class="absolute px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-sm text-sm"
            :style="{ left: f.x + '%', top: f.y + '%', transform: `scale(${f.s})` }"
          >
            {{ f.name }}
          </div>
        </transition-group>
      </div>

      <!-- Контент центра -->
      <div class="relative h-full flex flex-col items-center justify-center gap-8">
        <div class="text-center space-y-2">
          <p class="uppercase tracking-widest text-emerald-400 text-xs">{{ companyName }}</p>
          <h1 class="text-3xl font-semibold">Спасибо за уделенное время!</h1>
          <p class="text-neutral-400">Ваши имена уже в гараже команды 🚀</p>
        </div>

        <!-- Подиум -->
        <div class="w-full max-w-6xl mx-auto">
          <div
            class="grid gap-3 items-end justify-center"
            :class="{
              'grid-cols-1': podium.length === 1,
              'grid-cols-2': podium.length === 2,
              'grid-cols-3': podium.length === 3,
              'grid-cols-4': podium.length === 4,
              'grid-cols-5': podium.length >= 5,
            }"
          >
            <div
              v-for="participant in podium"
              :key="participant.id"
              :class="[
                participant.height,
                'rounded-xl border flex flex-col items-center justify-end p-3 min-w-0',
                participant.isWinner
                  ? 'bg-emerald-600/20 border-emerald-500'
                  : 'bg-neutral-800 border-neutral-700',
              ]"
            >
              <div
                :class="[
                  'text-xs mb-1',
                  participant.isWinner ? 'text-emerald-400' : 'text-neutral-400',
                ]"
              >
                {{
                  participant.position === 1
                    ? 'I'
                    : participant.position === 2
                      ? 'II'
                      : participant.position === 3
                        ? 'III'
                        : participant.position
                }}
              </div>
              <div class="font-medium truncate w-full text-center" :title="participant.name">
                {{ participant.name }}
              </div>
            </div>
          </div>
        </div>

        <button
          @click="closeFinale"
          class="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-700"
        >
          Закрыть
        </button>
      </div>
    </div>
  </transition>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.chip-move {
  transition:
    transform 1s ease,
    left 1s ease,
    top 1s ease;
}
</style>
