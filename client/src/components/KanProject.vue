<script setup>
const props = defineProps({
  id: {
    type: [String, Number],
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
})
</script>

<template>
  <!-- <div class="p-4 m-4 bg-bg-raised">
    <h1>
      <RouterLink :to="{ name: 'Kanban', params: { id: props.id } }">{{ props.name }}</RouterLink>
    </h1>
    <p>{{ props.description }}</p>
  </div> -->
  <div
    class="group relative bg-bg-raised border border-bg-border rounded-card p-5 flex flex-col gap-4 hover:border-accent/40 hover:shadow-accent transition-all duration-200 cursor-pointer overflow-hidden"
  >
    <!-- Top accent line -->
    <div
      class="absolute top-0 left-0 right-0 h-0.5 bg-accent rounded-t-card opacity-0 group-hover:opacity-100 transition-opacity duration-200"
    />

    <div class="flex items-start justify-between">
      <!-- Icon + title -->
      <div class="flex items-center gap-3">
        <div
          class="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0"
        >
          <svg
            class="w-4 h-4 text-accent"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          >
            <rect x="2" y="2" width="5" height="12" rx="1" />
            <rect x="9" y="2" width="5" height="7" rx="1" />
          </svg>
        </div>
        <div>
          <RouterLink :to="{ name: 'Kanban', params: { id: props.id } }">
            <h3 class="font-display font-semibold text-sm text-text-primary leading-tight">
              {{ props.name }}
            </h3>
          </RouterLink>
          <p class="text-text-muted text-xs font-mono mt-0.5">shinko / design-system</p>
        </div>
      </div>
      <!-- Status badge -->
      <span
        class="text-xs font-mono font-medium px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20 shrink-0"
      >
        Active
      </span>
    </div>

    <!-- Description -->
    <p class="text-text-secondary text-xs leading-relaxed line-clamp-2">
      {{ props.description }}
    </p>

    <!-- Progress -->
    <div class="space-y-1.5">
      <div class="flex justify-between text-xs">
        <span class="text-text-muted">Progress</span>
        <span class="text-text-secondary font-mono">14 / 20 tasks</span>
      </div>
      <div class="h-1 bg-bg-border rounded-full overflow-hidden">
        <div class="h-full bg-accent rounded-full" style="width: 70%" />
      </div>
    </div>

    <!-- Footer -->
    <div class="flex items-center justify-between pt-1 border-t border-bg-border">
      <div class="flex -space-x-2">
        <div
          class="w-6 h-6 rounded-full bg-info/20 border-2 border-bg-surface flex items-center justify-center text-info text-[9px] font-bold"
        >
          AM
        </div>
        <div
          class="w-6 h-6 rounded-full bg-accent/20 border-2 border-bg-surface flex items-center justify-center text-accent text-[9px] font-bold"
        >
          JK
        </div>
        <div
          class="w-6 h-6 rounded-full bg-warning/20 border-2 border-bg-surface flex items-center justify-center text-warning text-[9px] font-bold"
        >
          SR
        </div>
      </div>
      <span class="text-text-muted text-xs font-mono">2d ago</span>
    </div>
  </div>
</template>
