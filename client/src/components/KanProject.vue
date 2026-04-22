<script setup>
const props = defineProps({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
})
</script>

<template>
  <div class="p-4 m-4 bg-blue-300">
    <h1>{{ props.name }}</h1>
    <p>{{ props.description }}</p>
  </div>
</template>
