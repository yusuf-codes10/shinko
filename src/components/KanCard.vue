<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="bg-green-700 py-4 px-2">
    <header class="flex justify-between">
      <h2>{{ props.title }}</h2>
      <i class="fa-solid fa-plus"></i>
    </header>
    <slot></slot>
  </div>
</template>

<style scoped>
</style>
