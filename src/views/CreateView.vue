<script setup>
const addSomething = async (project) => {
  const endpoint = 'http://localhost:3000/projects'

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application.json' },
      body: JSON.stringify(project),
    })
    // we have the res
    const data = await res.json()
    console.log(data)
  } catch (err) {
    console.log(err.nessage)
  }
}
</script>

<template>
  <div>
    This is the create view
    <div>
      add a new project:
      <label for="project">Project name</label>
      <input type="text" name="" id="project" v-model="project" />
      <button @click="addSomething(project)"></button>
    </div>
  </div>
</template>

<style scoped>
</style>
