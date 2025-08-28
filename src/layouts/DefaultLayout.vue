<template>
  <div class="min-h-screen bg-neutral-900 text-neutral-100">
    <header class="sticky top-0 z-40 border-b border-neutral-800 bg-neutral-900/80 backdrop-blur">
      <nav class="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="text-2xl">🏍️</span>
          <span class="font-semibold">Moto Portal</span>
        </div>
        <div class="flex items-center gap-3 text-sm">
          <router-link class="px-3 py-1.5 rounded-lg hover:bg-neutral-800" :to="{ name: 'home' }"
            >Домашняя страница</router-link
          >
          <router-link
            class="px-3 py-1.5 rounded-lg hover:bg-neutral-800"
            :to="{ name: 'challenge' }"
            >ГАРАЖ</router-link
          >
        </div>
      </nav>
    </header>

    <div class="p-5">
      <router-view />
    </div>
  </div>
</template>
