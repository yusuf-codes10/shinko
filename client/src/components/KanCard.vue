<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
})

const showModal = () => {
  alert('clicked')
}
</script>

<template>
  <div class="bg-green-700 py-4 px-2">
    <header class="flex justify-between">
      <h2>{{ props.title }}</h2>
      <i @click="showModal" class="fa-solid fa-plus cursor-pointer"></i>
    </header>
    <slot></slot>
  </div>
</template>

<style scoped>
</style>
