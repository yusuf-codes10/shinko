<!-- src/components/ShinkoLogo.vue -->
<script setup>
defineProps({
  width: { type: String, default: '160px' },

  leftStart: { type: String, default: '#1E2F7A' },
  leftEnd: { type: String, default: '#0D1A52' },

  middleStart: { type: String, default: '#2846E8' },
  middleEnd: { type: String, default: '#152C9E' },

  purpleStart: { type: String, default: '#7B3FF2' },
  purpleEnd: { type: String, default: '#4A1FC7' },
})
</script>

<template>
  <svg :width="width" viewBox="0 0 512 512" role="img" xmlns="http://www.w3.org/2000/svg">
    <title>Shinko</title>

    <defs>
      <!-- Left column -->
      <linearGradient id="gradLeft" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" :stop-color="leftStart" />
        <stop offset="100%" :stop-color="leftEnd" />
      </linearGradient>

      <!-- Middle column -->
      <linearGradient id="gradMiddle" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" :stop-color="middleStart" />
        <stop offset="100%" :stop-color="middleEnd" />
      </linearGradient>

      <!-- Purple blocks -->
      <linearGradient id="gradPurple" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" :stop-color="purpleStart" />
        <stop offset="100%" :stop-color="purpleEnd" />
      </linearGradient>
    </defs>

    <!-- Left tall column -->
    <rect x="120" y="120" width="58" height="240" fill="url(#gradLeft)" />

    <!-- Middle tall column -->
    <rect x="198" y="120" width="58" height="240" fill="url(#gradMiddle)" />

    <!-- Top right block -->
    <rect x="276" y="170" width="116" height="42" fill="url(#gradMiddle)" />

    <!-- Middle right block -->
    <rect x="276" y="232" width="116" height="42" fill="url(#gradPurple)" />

    <!-- Bottom right block -->
    <rect x="276" y="294" width="116" height="66" fill="url(#gradPurple)" />
  </svg>
</template>
