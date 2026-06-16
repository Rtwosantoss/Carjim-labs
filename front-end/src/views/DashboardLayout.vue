<template>
  <div class="flex h-screen bg-[#f4faf8]">
    <AppSidebar />
    <main class="flex-1 overflow-auto">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import AppSidebar from '../components/AppSidebar.vue'
import { RouterView } from 'vue-router'
</script>
