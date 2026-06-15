<template>
  <div class="rounded-xl border border-slate-400 bg-white p-6 text-left">
    <span class="text-sm font-bold text-[#24b6a1]">
      {{ number }}
    </span>

    <h3 class="mt-4 text-lg font-bold text-slate-950">
      {{ title }}
    </h3>

    <p class="mt-3 text-sm text-slate-600">
      {{ description }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  number: String,
  title: String,
  description: String,
})
</script>
