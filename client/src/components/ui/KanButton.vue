<script setup>
const props = defineProps({
  btnTitle: String,
  isDisabled: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <button
    :disabled="!isDisabled"
    class="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-text-inverse font-medium text-sm px-4 py-2 rounded-btn transition-all duration-150 hover:shadow-accent disabled:opacity-50 disabled:hover:bg-accent disabled:cursor-not-allowed"
  >
    {{ props.btnTitle }}
  </button>
</template>

<style scoped>
</style>
