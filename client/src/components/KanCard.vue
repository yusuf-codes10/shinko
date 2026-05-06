<!-- KanbanColumn.vue -->
<script setup>
const props = defineProps({
  title: { type: String, required: true },
  count: { type: Number, default: 0 },
})
</script>

<template>
  <div class="bg-bg-raised rounded-xl py-4 px-3 flex flex-col gap-3 min-w-70">
    <header class="flex items-center justify-between px-2">
      <h2 class="font-display font-semibold text-text-primary text-sm tracking-wide uppercase">
        {{ props.title }}
      </h2>
      <span
        class="text-xs font-mono font-medium px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20 shrink-0"
      >
        {{ props.count }}
      </span>
    </header>

    <div class="flex flex-col gap-2">
      <slot></slot>
    </div>
  </div>
</template>
