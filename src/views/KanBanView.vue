<script setup>
import { ref, onMounted } from 'vue'

const data = ref([])

// fetch the data with the onMounted lifecycle hook
onMounted(() => {
  const endpoint = 'http://localhost:3000/projects'
  fetch(endpoint).then((res) => res.json())
})

console.log(data.value)
</script>

<template>
  <div></div>
</template>

<style scoped>
</style>
