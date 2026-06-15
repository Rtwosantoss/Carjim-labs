<template>
    <div class="rounded-xl border border-slate-400 bg-white p-6 text-left">
        <h3 class="text-lg font-bold text-slate-950">
            {{ title }}

        </h3>
        
        <p class="mt-4 text-slate-500">
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