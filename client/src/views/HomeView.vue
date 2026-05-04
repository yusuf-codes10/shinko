<script setup>
import { useAuthStore } from '@/stores/authStore.js'

const authStore = useAuthStore()
</script>

<template>
  <div
    class="relative flex flex-col items-center justify-center h-screen overflow-hidden bg-bg-base font-sans"
  >
    <!-- Background grid -->
    <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#1F2D45" stroke-width="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <!-- Radial fade to hide grid edges -->
        <radialGradient id="fade" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stop-color="#0A0F1E" stop-opacity="0" />
          <stop offset="100%" stop-color="#0A0F1E" stop-opacity="1" />
        </radialGradient>
        <rect width="100%" height="100%" fill="url(#fade)" />
      </svg>
    </div>

    <!-- Accent glow blob -->
    <div
      class="absolute rounded-full pointer-events-none"
      style="
        width: 520px;
        height: 320px;
        background: radial-gradient(ellipse, rgba(0, 200, 150, 0.08) 0%, transparent 70%);
        top: 50%;
        left: 50%;
        transform: translate(-50%, -60%);
        filter: blur(40px);
      "
      aria-hidden="true"
    />

    <!-- Content -->
    <div class="relative z-10 flex flex-col items-center gap-6 text-center px-6">
      <!-- Eyebrow badge -->
      <span class="badge badge-accent text-xs tracking-widest uppercase font-mono">
        Open beta
      </span>

      <!-- Logo / wordmark -->
      <h1
        class="font-display font-semibold text-text-primary leading-none tracking-tight"
        style="font-size: clamp(4rem, 12vw, 9rem)"
      >
        shinko
      </h1>

      <!-- Tagline -->
      <p class="text-text-secondary text-base md:text-lg max-w-sm leading-relaxed">
        Ship projects faster. Boards that actually work the way your team thinks.
      </p>

      <!-- CTA -->
      <div class="flex items-center gap-3 mt-2">
        <RouterLink
          v-if="authStore.user"
          :to="{ name: 'Projects', params: { username: authStore.user?.username } }"
        >
          <button class="btn-primary text-sm px-5 py-2.5">Go to projects &rarr;</button>
        </RouterLink>

        <template v-else>
          <RouterLink :to="{ name: 'Register' }">
            <button class="btn-primary text-sm px-5 py-2.5">Get started free &rarr;</button>
          </RouterLink>
          <RouterLink :to="{ name: 'Login' }">
            <button class="btn-ghost text-sm px-5 py-2.5">Sign in</button>
          </RouterLink>
        </template>
      </div>

      <!-- Social proof hint -->
      <p class="text-text-muted text-xs font-mono mt-1">
        No credit card required · Free forever on solo plan
      </p>
    </div>
  </div>
</template>

<style scoped>
</style>
