<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
})
const emit = defineEmits(['delete'])
</script>

<template>
  <div class="bg-yellow-300 flex justify-between p-4 cursor-grab active:cursor-grabbing">
    <p>{{ props.title }}</p>
    <i @click="emit" class="fa-solid fa-trash cursor-pointer"></i>
  </div>
</template>

<style scoped>
</style>
