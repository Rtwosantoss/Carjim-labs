<template>
  <div
    class="p-6 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white transition"
  >
    <h3 class="font-semibold text-lg">
      {{ title }}
    </h3>

    <p class="mt-3 text-slate-600 text-sm">
      {{ description }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  description: String
})
</script>