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
    <header>{{ props.title }}</header>
    <slot></slot>
  </div>
</template>

<style scoped>
</style>
