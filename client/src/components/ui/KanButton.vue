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
    :disabled="!props.isDisabled || props.loading"
    class="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-text-inverse font-medium text-sm px-4 py-2 rounded-btn transition-all duration-150 hover:shadow-accent disabled:opacity-50 disabled:hover:bg-accent disabled:cursor-not-allowed"
  >
    <div
      v-if="loading"
      class="animate-spin rounded-full w-4 h-4 border-2 border-white/30 border-t-white"
    />
    {{ props.loading ? '' : props.btnTitle }}
  </button>
</template>
