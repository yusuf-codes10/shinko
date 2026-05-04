<!-- KanbanTask.vue -->
<script setup>
const props = defineProps({
  title: { type: String, required: true },
  status: { type: String },
})
const emit = defineEmits(['delete'])
</script>

<template>
  <div
    class="bg-bg-raised border border-bg-border rounded-xl flex items-center justify-between px-4 py-3 gap-3 cursor-grab active:cursor-grabbing hover:border-accent/40 hover:shadow-accent transition-all duration-150"
  >
    <div class="flex flex-col gap-1 min-w-0">
      <p class="text-text-primary text-sm font-medium truncate">{{ props.title }}</p>
      <span v-if="props.status" class="text-text-muted text-xs font-mono">{{ props.status }}</span>
    </div>

    <i
      @click="emit('delete')"
      class="fa-solid fa-trash text-text-muted hover:text-danger cursor-pointer transition-colors shrink-0 text-xs"
    />
  </div>
</template>
