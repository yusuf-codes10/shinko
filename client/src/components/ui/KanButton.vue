<script setup>
const props = defineProps({
  btnTitle: String,
})
</script>

<template>
  <button
    class="inline-flex items-center gap-2 bg-bg-purple hover:bg-purple/50 text-text-inverse font-medium text-sm px-4 py-2 rounded-btn transition-all duration-150 hover:shadow-accent cursor-pointer"
  >
    {{ props.btnTitle }}
  </button>
</template>

<style scoped>
</style>
