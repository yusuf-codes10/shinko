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
    class="group bg-bg-raised border border-bg-border rounded-xl flex flex-col gap-2 px-4 py-3 cursor-grab active:cursor-grabbing hover:border-accent/30 transition-all duration-150"
  >
    <!-- Title row -->
    <div class="flex items-start justify-between gap-3">
      <p class="text-text-primary text-sm font-medium leading-snug">
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
      class="flex items-center justify-between border-t border-bg-border pt-2"
    >
      <div v-if="props.category" class="flex items-center gap-1.5">
        <span class="w-1.5 h-1.5 rounded-full shrink-0" :style="{ background: dotColor }" />
        <span class="text-text-muted text-xs font-mono capitalize">{{ props.category }}</span>
      </div>

      <span v-if="props.status" class="text-text-muted text-xs font-mono ml-auto">
        {{ props.status }}
      </span>
    </div>
  </div>
</template>
