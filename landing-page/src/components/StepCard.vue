<template>
  <div class="text-center">
    <div
      class="w-16 h-16 mx-auto rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold"
    >
      {{ number }}
    </div>

    <h3 class="mt-4 font-semibold">
      {{ title }}
    </h3>
  </div>
</template>

<script setup>
defineProps({
  number: String,
  title: String
})
</script>