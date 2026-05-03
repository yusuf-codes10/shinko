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
  <div class="bg-bg-raised py-4 px-2">
    <div class="border-bg-border border-2">
      <header class="flex justify-between bg-bg-purple">
        <h2>{{ props.title }}</h2>
        <i @click="emit('create')" class="fa-solid fa-plus cursor-pointer"></i>
      </header>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
</style>
