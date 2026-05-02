<script setup>
const props = defineProps({
  id: {
    type: [String, Number],
  },
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
    <h1>
      <RouterLink :to="{ name: 'Kanban', params: { id: props.id } }">{{ props.name }}</RouterLink>
    </h1>
    <p>{{ props.description }}</p>
  </div>
</template>
