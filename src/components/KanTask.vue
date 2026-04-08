<script setup>
const deleteTask = () => {
  alert('Deleeeeeeeeeeeeeeeeeting')
}
</script>

<template>
  <div class="bg-yellow-300 flex justify-between p-4 cursor-grab active:cursor-grabbing">
    <p>Task1</p>
    <i @click="deleteTask" class="fa-solid fa-trash cursor-pointer"></i>
  </div>
</template>

<style scoped>
</style>
