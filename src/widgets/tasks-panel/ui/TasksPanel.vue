<script setup lang="ts">
import { useTasks, TaskItem } from '@/entities/task'
import { AddTaskForm } from '@/features/task-add'

const tasks = useTasks()

function onToggle(id: string) {
  tasks.toggle(id)
}
function onAssign(payload: { id: string; askedById?: string }) {
  tasks.assign(payload.id, payload.askedById)
}
function onRemove(id: string) {
  tasks.remove(id)
}
</script>

<template>
  <div class="rounded-2xl border border-neutral-800 p-4 bg-neutral-850/30 space-y-3">
    <h2 class="font-medium">Задачи</h2>
    <AddTaskForm />

    <div class="flex items-center justify-between text-xs text-neutral-400 mt-1">
      <span>Выполнено: {{ tasks.doneCount }} / {{ tasks.count }} ({{ tasks.progress }}%)</span>
      <button
        @click="tasks.clear()"
        class="px-2 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 border border-neutral-700"
      >
        Очистить
      </button>
    </div>

    <ul class="divide-y divide-neutral-800">
      <TaskItem
        v-for="task in tasks.items"
        :key="task.id"
        :task="task"
        @toggle="onToggle"
        @assign="onAssign"
        @remove="onRemove"
      />
    </ul>
  </div>
</template>
