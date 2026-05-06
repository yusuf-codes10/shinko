<script setup>
const props = defineProps({
  width: {
    type: String,
    default: '0' + '%',
  },
})
</script>

<template>
  <div class="h-1 bg-bg-border rounded-full overflow-hidden">
    <div :style="{ width: props.width }" class="h-full bg-accent rounded-full"></div>
  </div>
</template>

<style scoped>
</style>
