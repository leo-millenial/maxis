<script setup lang="ts">
const companyName = import.meta.env.VITE_COMPANY_NAME
</script>

<template>
  <div class="min-h-[calc(100vh-4rem)] grid place-items-center bg-neutral-900 text-neutral-100 p-6">
    <div class="text-center space-y-4">
      <h1 class="text-3xl">Привет {{ companyName }}!</h1>

      <h1 class="text-2xl font-semibold">🏍️ Moto Portal — собеседование</h1>
      <p class="text-neutral-300">
        Открой страницу
        <router-link class="underline" :to="{ name: 'challenge' }">ГАРАЖ</router-link> для испытаний
      </p>
    </div>
  </div>
</template>
