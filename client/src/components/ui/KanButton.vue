<script setup>
const props = defineProps({
  btnTitle: String,
  isDisabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <button
    :disabled="!isDisabled"
    class="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-text-inverse font-medium text-sm px-4 py-2 rounded-btn transition-all duration-150 hover:shadow-accent disabled:opacity-50 disabled:hover:bg-accent disabled:cursor-not-allowed"
    :class="
      props.loading
        ? 'animate-spin rounded-full w-10 h-10 border-4 border-gray-200 border-t-gray-900'
        : ''
    "
  >
    {{ props.loading ? props.btnTitle : '' }}
  </button>
</template>

<style scoped>
</style>
