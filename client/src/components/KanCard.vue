<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    default: 0,
  },
})
</script>

<template>
  <div class="bg-bg-raised rounded-xl py-4 px-2">
    <div class="border-bg-border rounded-xl border-2">
      <header class="flex justify-between my-2">
        <h2>{{ props.title }}</h2>
        <!-- TODO: we might add some sort of task category -->
        <p class="text-text-muted">{{ props.count }}</p>
      </header>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
</style>
