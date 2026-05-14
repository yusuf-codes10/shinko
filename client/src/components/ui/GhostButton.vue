<script setup>
const props = defineProps({
  btnTitle: {
    Type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'button',
  },
})
</script>

<template>
  <button
    :type="props.type"
    class="inline-flex items-center gap-2 bg-transparent hover:bg-bg-raised text-text-secondary hover:text-text-primary border border-bg-border hover:border-accent/40 font-medium text-sm px-5 py-2.5 rounded-btn transition-all duration-150 cursor-pointer"
  >
    {{ props.btnTitle }}
  </button>
</template>
