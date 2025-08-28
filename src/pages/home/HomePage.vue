<script setup lang="ts">
const companyName = import.meta.env.VITE_COMPANY_NAME
</script>

<template>
  <div>
    <h1 class="text-2xl">Привет {{ companyName }}!</h1>
  </div>
</template>
