<template>
  <header class="bg-white border-b border-slate-200 px-6 py-4">
    <div class="flex items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">{{ title }}</h1>
        <p v-if="subtitle" class="text-sm text-slate-500">{{ subtitle }}</p>
      </div>

      <div class="flex items-center gap-3">
        <!-- Avatar -->
        <div class="w-9 h-9 rounded-full bg-[#24b6a1]/20 flex items-center justify-center">
          <span class="text-sm font-semibold text-[#24b6a1]">CL</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
defineProps({
  title: String,
  subtitle: String,
})
</script>
