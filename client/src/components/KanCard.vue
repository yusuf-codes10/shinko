<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['create'])
</script>

<template>
  <div class="bg-bg-raised rounded-xl py-4 px-2">
    <div class="border-bg-border rounded-xl border-2">
      <header class="flex justify-between">
        <h2>{{ props.title }}</h2>
        <i @click="emit('create')" class="fa-solid fa-plus cursor-pointer"></i>
      </header>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
</style>
