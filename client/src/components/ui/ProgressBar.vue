<script setup>
const props = defineProps({
  width: {
    type: String,
    default: '0' + 'px',
  },
})
</script>

<template>
  <div class="w-full p-4">
    <div :style="{ width: props.width }" class="bg-accent"></div>
  </div>
</template>

<style scoped>
</style>
