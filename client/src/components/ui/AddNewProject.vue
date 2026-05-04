<script setup>
</script>

<template>
  <div
    class="group bg-bg-surface border border-dashed border-bg-border rounded-card p-5 flex flex-col items-center justify-center gap-3 hover:border-accent/50 hover:bg-bg-raised transition-all duration-200 cursor-pointer min-h-50"
  >
    <div
      class="w-10 h-10 rounded-full bg-bg-border group-hover:bg-accent/10 border border-bg-border group-hover:border-accent/30 flex items-center justify-center transition-all duration-200"
    >
      <svg
        class="w-4 h-4 text-text-muted group-hover:text-accent transition-colors duration-200"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
      >
        <line x1="8" y1="2" x2="8" y2="14" />
        <line x1="2" y1="8" x2="14" y2="8" />
      </svg>
    </div>
    <span
      class="text-text-muted group-hover:text-text-secondary text-sm font-medium transition-colors duration-200"
      >New project</span
    >
  </div>
</template>

<style scoped>
</style>
