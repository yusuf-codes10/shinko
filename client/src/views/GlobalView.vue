<script setup>
/**
 * shinko — UI Component Showcase
 * Copy any block into your project. All components rely solely on
 * the @theme tokens defined in kanban-theme.css.
 */
</script>

<template>
  <div class="min-h-screen bg-bg-base font-sans text-text-primary px-8 py-12 space-y-16">

    <!-- ───────────────────────────────────────────────
         BUTTONS
    ─────────────────────────────────────────────────── -->
    <section class="space-y-4">
      <h2 class="font-display text-xs uppercase tracking-widest text-text-muted font-semibold">Buttons</h2>

      <div class="flex flex-wrap gap-3 items-center">

        <!-- Primary -->
        <button class="
          inline-flex items-center gap-2
          bg-accent hover:bg-accent-light active:bg-accent-dark
          text-text-inverse font-medium text-sm
          px-5 py-2.5 rounded-btn
          transition-all duration-150
          hover:shadow-accent
          cursor-pointer
        ">
          Create project
          <svg class="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
        </button>

        <!-- Ghost -->
        <button class="
          inline-flex items-center gap-2
          bg-transparent hover:bg-bg-raised
          text-text-secondary hover:text-text-primary
          border border-bg-border hover:border-accent/40
          font-medium text-sm
          px-5 py-2.5 rounded-btn
          transition-all duration-150
          cursor-pointer
        ">
          View all
        </button>

        <!-- Danger -->
        <button class="
          inline-flex items-center gap-2
          bg-transparent hover:bg-danger/10
          text-danger border border-danger/30 hover:border-danger/60
          font-medium text-sm
          px-5 py-2.5 rounded-btn
          transition-all duration-150
          cursor-pointer
        ">
          <svg class="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="3 6 4 13 12 13 13 6"/><path d="M1 4h14M6 4V2h4v2"/></svg>
          Delete
        </button>

        <!-- Icon-only -->
        <button class="
          flex items-center justify-center
          w-9 h-9 rounded-btn
          bg-bg-raised hover:bg-bg-border
          border border-bg-border
          text-text-secondary hover:text-text-primary
          transition-all duration-150 cursor-pointer
        ">
          <svg class="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="8" y1="2" x2="8" y2="14"/><line x1="2" y1="8" x2="14" y2="8"/></svg>
        </button>

        <!-- Loading state -->
        <button disabled class="
          inline-flex items-center gap-2
          bg-accent/50 text-text-inverse/70
          font-medium text-sm
          px-5 py-2.5 rounded-btn
          cursor-not-allowed
        ">
          <svg class="w-3.5 h-3.5 animate-spin" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M8 2a6 6 0 1 0 6 6" stroke-linecap="round"/></svg>
          Saving…
        </button>

      </div>
    </section>

    <!-- ───────────────────────────────────────────────
         INPUTS
    ─────────────────────────────────────────────────── -->
    <section class="space-y-4 max-w-md">
      <h2 class="font-display text-xs uppercase tracking-widest text-text-muted font-semibold">Inputs</h2>

      <div class="space-y-3">

        <!-- Default input -->
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-medium text-text-secondary">Project name</label>
          <input
            type="text"
            placeholder="e.g. Design System v3"
            class="
              w-full bg-bg-raised border border-bg-border
              text-text-primary placeholder:text-text-muted
              text-sm px-3.5 py-2.5 rounded-btn
              focus:outline-none focus:border-accent focus:shadow-input
              transition-all duration-150
            "
          />
        </div>

        <!-- With icon prefix -->
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-medium text-text-secondary">Search tasks</label>
          <div class="relative">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="7" cy="7" r="4"/><path d="M11 11l3 3"/></svg>
            <input
              type="text"
              placeholder="Search…"
              class="
                w-full bg-bg-raised border border-bg-border
                text-text-primary placeholder:text-text-muted
                text-sm pl-9 pr-3.5 py-2.5 rounded-btn
                focus:outline-none focus:border-accent focus:shadow-input
                transition-all duration-150
              "
            />
          </div>
        </div>

        <!-- Textarea -->
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-medium text-text-secondary">Description</label>
          <textarea
            placeholder="What's this project about?"
            rows="3"
            class="
              w-full bg-bg-raised border border-bg-border
              text-text-primary placeholder:text-text-muted
              text-sm px-3.5 py-2.5 rounded-btn resize-none
              focus:outline-none focus:border-accent focus:shadow-input
              transition-all duration-150
            "
          />
        </div>

        <!-- Select -->
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-medium text-text-secondary">Visibility</label>
          <div class="relative">
            <select class="
              w-full appearance-none bg-bg-raised border border-bg-border
              text-text-primary text-sm
              px-3.5 py-2.5 rounded-btn
              focus:outline-none focus:border-accent focus:shadow-input
              transition-all duration-150 cursor-pointer
            ">
              <option>Private</option>
              <option>Team</option>
              <option>Public</option>
            </select>
            <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted pointer-events-none" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M4 6l4 4 4-4"/></svg>
          </div>
        </div>

      </div>
    </section>

    <!-- ───────────────────────────────────────────────
         PROJECT CARD
    ─────────────────────────────────────────────────── -->
    <section class="space-y-4">
      <h2 class="font-display text-xs uppercase tracking-widest text-text-muted font-semibold">Project card</h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">

        <!-- Active project -->
        <div class="
          group relative
          bg-bg-surface border border-bg-border rounded-card
          p-5 flex flex-col gap-4
          hover:border-accent/40 hover:shadow-accent
          transition-all duration-200 cursor-pointer
          overflow-hidden
        ">
          <!-- Top accent line -->
          <div class="absolute top-0 left-0 right-0 h-0.5 bg-accent rounded-t-card opacity-0 group-hover:opacity-100 transition-opacity duration-200"/>

          <div class="flex items-start justify-between">
            <!-- Icon + title -->
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                <svg class="w-4 h-4 text-accent" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="2" y="2" width="5" height="12" rx="1"/><rect x="9" y="2" width="5" height="7" rx="1"/></svg>
              </div>
              <div>
                <h3 class="font-display font-semibold text-sm text-text-primary leading-tight">Design System</h3>
                <p class="text-text-muted text-xs font-mono mt-0.5">shinko / design-system</p>
              </div>
            </div>
            <!-- Status badge -->
            <span class="text-xs font-mono font-medium px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20 shrink-0">
              Active
            </span>
          </div>

          <!-- Description -->
          <p class="text-text-secondary text-xs leading-relaxed line-clamp-2">
            Tokens, components, and guidelines for the entire shinko product suite.
          </p>

          <!-- Progress -->
          <div class="space-y-1.5">
            <div class="flex justify-between text-xs">
              <span class="text-text-muted">Progress</span>
              <span class="text-text-secondary font-mono">14 / 20 tasks</span>
            </div>
            <div class="h-1 bg-bg-border rounded-full overflow-hidden">
              <div class="h-full bg-accent rounded-full" style="width: 70%"/>
            </div>
          </div>

          <!-- Footer -->
          <div class="flex items-center justify-between pt-1 border-t border-bg-border">
            <div class="flex -space-x-2">
              <div class="w-6 h-6 rounded-full bg-info/20 border-2 border-bg-surface flex items-center justify-center text-info text-[9px] font-bold">AM</div>
              <div class="w-6 h-6 rounded-full bg-accent/20 border-2 border-bg-surface flex items-center justify-center text-accent text-[9px] font-bold">JK</div>
              <div class="w-6 h-6 rounded-full bg-warning/20 border-2 border-bg-surface flex items-center justify-center text-warning text-[9px] font-bold">SR</div>
            </div>
            <span class="text-text-muted text-xs font-mono">2d ago</span>
          </div>
        </div>

        <!-- Paused project -->
        <div class="
          group relative
          bg-bg-surface border border-bg-border rounded-card
          p-5 flex flex-col gap-4
          hover:border-warning/40
          transition-all duration-200 cursor-pointer
          overflow-hidden
        ">
          <div class="absolute top-0 left-0 right-0 h-0.5 bg-warning rounded-t-card opacity-0 group-hover:opacity-100 transition-opacity duration-200"/>
          <div class="flex items-start justify-between">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-lg bg-warning/10 border border-warning/20 flex items-center justify-center shrink-0">
                <svg class="w-4 h-4 text-warning" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="8" cy="8" r="6"/><path d="M8 5v3"/><circle cx="8" cy="11" r="0.5" fill="currentColor"/></svg>
              </div>
              <div>
                <h3 class="font-display font-semibold text-sm text-text-primary leading-tight">Mobile App</h3>
                <p class="text-text-muted text-xs font-mono mt-0.5">shinko / mobile</p>
              </div>
            </div>
            <span class="text-xs font-mono font-medium px-2 py-0.5 rounded-full bg-warning/10 text-warning border border-warning/20 shrink-0">
              Paused
            </span>
          </div>
          <p class="text-text-secondary text-xs leading-relaxed line-clamp-2">
            iOS and Android client. Blocked pending API v2 finalisation.
          </p>
          <div class="space-y-1.5">
            <div class="flex justify-between text-xs">
              <span class="text-text-muted">Progress</span>
              <span class="text-text-secondary font-mono">6 / 34 tasks</span>
            </div>
            <div class="h-1 bg-bg-border rounded-full overflow-hidden">
              <div class="h-full bg-warning rounded-full" style="width: 18%"/>
            </div>
          </div>
          <div class="flex items-center justify-between pt-1 border-t border-bg-border">
            <div class="flex -space-x-2">
              <div class="w-6 h-6 rounded-full bg-info/20 border-2 border-bg-surface flex items-center justify-center text-info text-[9px] font-bold">LP</div>
            </div>
            <span class="text-text-muted text-xs font-mono">1w ago</span>
          </div>
        </div>

        <!-- Add new project card -->
        <div class="
          group
          bg-bg-surface border border-dashed border-bg-border rounded-card
          p-5 flex flex-col items-center justify-center gap-3
          hover:border-accent/50 hover:bg-bg-raised
          transition-all duration-200 cursor-pointer
          min-h-[200px]
        ">
          <div class="w-10 h-10 rounded-full bg-bg-border group-hover:bg-accent/10 border border-bg-border group-hover:border-accent/30 flex items-center justify-center transition-all duration-200">
            <svg class="w-4 h-4 text-text-muted group-hover:text-accent transition-colors duration-200" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="8" y1="2" x2="8" y2="14"/><line x1="2" y1="8" x2="14" y2="8"/></svg>
          </div>
          <span class="text-text-muted group-hover:text-text-secondary text-sm font-medium transition-colors duration-200">New project</span>
        </div>

      </div>
    </section>

    <!-- ───────────────────────────────────────────────
         BADGES / TAGS
    ─────────────────────────────────────────────────── -->
    <section class="space-y-4">
      <h2 class="font-display text-xs uppercase tracking-widest text-text-muted font-semibold">Badges &amp; tags</h2>
      <div class="flex flex-wrap gap-2">
        <span class="text-xs font-mono font-medium px-2.5 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">Active</span>
        <span class="text-xs font-mono font-medium px-2.5 py-1 rounded-full bg-info/10 text-info border border-info/20">In review</span>
        <span class="text-xs font-mono font-medium px-2.5 py-1 rounded-full bg-warning/10 text-warning border border-warning/20">Paused</span>
        <span class="text-xs font-mono font-medium px-2.5 py-1 rounded-full bg-danger/10 text-danger border border-danger/20">Blocked</span>
        <span class="text-xs font-mono font-medium px-2.5 py-1 rounded-full bg-bg-border text-text-secondary border border-bg-border">Draft</span>
        <span class="text-xs font-mono font-medium px-2.5 py-1 rounded-full bg-bg-border text-text-muted">Archived</span>
      </div>
    </section>

    <!-- ───────────────────────────────────────────────
         AVATAR GROUP
    ─────────────────────────────────────────────────── -->
    <section class="space-y-4">
      <h2 class="font-display text-xs uppercase tracking-widest text-text-muted font-semibold">Avatar group</h2>
      <div class="flex items-center gap-4">
        <!-- Stacked -->
        <div class="flex -space-x-2.5">
          <div class="w-8 h-8 rounded-full bg-info/20 border-2 border-bg-base flex items-center justify-center text-info text-xs font-bold">AM</div>
          <div class="w-8 h-8 rounded-full bg-accent/20 border-2 border-bg-base flex items-center justify-center text-accent text-xs font-bold">JK</div>
          <div class="w-8 h-8 rounded-full bg-warning/20 border-2 border-bg-base flex items-center justify-center text-warning text-xs font-bold">SR</div>
          <div class="w-8 h-8 rounded-full bg-bg-border border-2 border-bg-base flex items-center justify-center text-text-muted text-xs font-mono">+4</div>
        </div>
        <span class="text-text-muted text-xs font-mono">7 members</span>
      </div>
    </section>

    <!-- ───────────────────────────────────────────────
         EMPTY STATE
    ─────────────────────────────────────────────────── -->
    <section class="space-y-4 max-w-sm">
      <h2 class="font-display text-xs uppercase tracking-widest text-text-muted font-semibold">Empty state</h2>
      <div class="bg-bg-surface border border-bg-border rounded-card p-10 flex flex-col items-center text-center gap-4">
        <div class="w-12 h-12 rounded-xl bg-bg-raised border border-bg-border flex items-center justify-center">
          <svg class="w-5 h-5 text-text-muted" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="2" y="2" width="5" height="12" rx="1"/><rect x="9" y="2" width="5" height="7" rx="1"/></svg>
        </div>
        <div class="space-y-1">
          <p class="font-display font-semibold text-sm text-text-primary">No projects yet</p>
          <p class="text-text-muted text-xs leading-relaxed">Create your first project to start organising your work.</p>
        </div>
        <button class="
          inline-flex items-center gap-2
          bg-accent hover:bg-accent-light
          text-text-inverse font-medium text-sm
          px-4 py-2 rounded-btn
          transition-all duration-150 hover:shadow-accent cursor-pointer
        ">
          Create project &rarr;
        </button>
      </div>
    </section>

    <!-- ───────────────────────────────────────────────
         ALERT / TOAST
    ─────────────────────────────────────────────────── -->
    <section class="space-y-4 max-w-md">
      <h2 class="font-display text-xs uppercase tracking-widest text-text-muted font-semibold">Alerts</h2>
      <div class="space-y-3">

        <div class="flex items-start gap-3 bg-accent/5 border border-accent/20 rounded-btn px-4 py-3">
          <svg class="w-4 h-4 text-accent shrink-0 mt-0.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M8 2a6 6 0 1 0 0 12A6 6 0 0 0 8 2z"/><path d="M8 7v3"/><circle cx="8" cy="5.5" r="0.5" fill="currentColor"/></svg>
          <p class="text-xs text-text-secondary leading-relaxed"><span class="text-accent font-medium">Project created.</span> Your board is ready — invite your team to get started.</p>
        </div>

        <div class="flex items-start gap-3 bg-danger/5 border border-danger/20 rounded-btn px-4 py-3">
          <svg class="w-4 h-4 text-danger shrink-0 mt-0.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="8" cy="8" r="6"/><path d="M8 5v3"/><circle cx="8" cy="11" r="0.5" fill="currentColor"/></svg>
          <p class="text-xs text-text-secondary leading-relaxed"><span class="text-danger font-medium">Action failed.</span> You don't have permission to delete this project.</p>
        </div>

      </div>
    </section>

    <!-- ───────────────────────────────────────────────
         DIVIDER
    ─────────────────────────────────────────────────── -->
    <section class="space-y-4 max-w-md">
      <h2 class="font-display text-xs uppercase tracking-widest text-text-muted font-semibold">Divider</h2>
      <div class="flex items-center gap-3">
        <div class="h-px flex-1 bg-bg-border"/>
        <span class="text-text-muted text-xs font-mono">or</span>
        <div class="h-px flex-1 bg-bg-border"/>
      </div>
    </section>

  </div>
</template>

<style scoped>
/* All styling is handled via @theme tokens + Tailwind utilities. */
/* Add component-specific overrides here only if needed. */
select option {
  background-color: var(--color-bg-raised);
  color: var(--color-text-primary);
}
</style>
