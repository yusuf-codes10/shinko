<script setup>
const props = defineProps({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
})
</script>

<template>
  <div class="p-4 m-4 bg-blue-300">
    <h1>{{ props.title }}</h1>
    <p>{{ props.description }}</p>
  </div>
</template>
