<template>
  <div
    class="bg-slate-50 border rounded-2xl p-8 text-center"
  >
    <h3 class="text-5xl font-bold text-emerald-600">
      {{ value }}
    </h3>

    <p class="text-slate-500 mt-2">
      {{ text }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  value: String,
  text: String
})
</script>