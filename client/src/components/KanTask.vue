<script setup>
import { computed } from 'vue'
const props = defineProps({
  title: { type: String, required: true },
  status: { type: String },
  category: { type: String },
})

const emit = defineEmits(['delete'])

const categoryColors = {
  Design: '#3B82F6',
  Bug: '#F05252',
  Feature: '#00C896',
  Database: '#F5A623',
}

const dotColor = computed(() => categoryColors[props.category] ?? '#4A5C7A')
</script>

<template>
  <div
    class="group bg-bg-raised border border-bg-border rounded-xl flex flex-col gap-2.5 px-4 py-3 mb-2.5 cursor-grab active:cursor-grabbing shadow-card hover:border-accent/50 hover:-translate-y-0.5 transition-all duration-150"
  >
    <!-- Title row -->
    <div class="flex items-start justify-between gap-3">
      <p class="text-text-primary text-sm font-semibold leading-snug">
        {{ props.title }}
      </p>
      <button
        @click="emit('delete')"
        class="opacity-0 group-hover:opacity-100 transition-opacity duration-150 shrink-0 mt-0.5"
        aria-label="Delete task"
      >
        <i
          class="fa-solid fa-trash text-text-muted hover:text-danger text-xs cursor-pointer transition-colors"
        />
      </button>
    </div>

    <!-- Footer row — only shown if category or status present -->
    <div
      v-if="props.category || props.status"
      class="flex items-center justify-between border-t border-bg-border pt-2.5"
    >
      <div v-if="props.category" class="flex items-center gap-2">
        <span
          class="w-2 h-2 rounded-full shrink-0"
          :style="{ background: dotColor, boxShadow: `0 0 0 3px ${dotColor}22` }"
        />
        <span class="text-text-secondary text-xs font-mono capitalize">{{ props.category }}</span>
      </div>

      <span
        v-if="props.status"
        class="text-text-secondary text-[11px] font-mono ml-auto px-2 py-0.5 rounded-md bg-bg-surface border border-bg-border"
      >
        {{ props.status }}
      </span>
    </div>
  </div>
</template>
