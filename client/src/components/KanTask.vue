<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  },
})
const emit = defineEmits(['delete'])
</script>

<template>
  <div class="flex justify-between p-4 cursor-grab active:cursor-grabbing rounded-xl">
    <p>{{ props.title }} | {{ props.status }}</p>
    <i @click="emit('delete')" class="fa-solid fa-trash cursor-pointer"></i>
  </div>
</template>

<style scoped>
</style>
