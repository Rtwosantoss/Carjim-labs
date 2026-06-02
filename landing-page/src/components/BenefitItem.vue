<template>
  <div class="flex gap-4">
    <div
      class="w-10 h-10 rounded-lg bg-emerald-100"
    ></div>

    <div>
      <h3 class="font-semibold">
        {{ title }}
      </h3>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String
})
</script>