<script setup>
import KanCard from '@/components/KanCard.vue'
import KanTask from '@/components/KanTask.vue'
import { ref, onMounted } from 'vue'
import draggable from 'vuedraggable'

const projects = ref([])
const loading = ref(false)
const isOld = ref(false)
const tasks = ref([])
const todos = ref([])
const progresses = ref([])
const dones = ref([])
const isModalOpen = ref(false)
const newTaskName = ref('')

const getTaskById = async (id) => {
  const endpoint = `http://localhost:8080/api${id}`
  try {
    const response = await fetch(endpoint)
    const data = await response.json()
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
  }
}

const getTodos = async () => {
  const endpoint = `http://localhost:8080/api/todo`
  try {
    const response = await fetch(endpoint)
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

const getProgresses = async () => {
  const endpoint = `http://localhost:8080/api/progress`
  try {
    const response = await fetch(endpoint)
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

const getDones = async () => {
  const endpoint = `http://localhost:8080/api/done`
  try {
    const response = await fetch(endpoint)
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}
console.log(getTaskById)

// post request
const createTask = async () => {
  if (!newTaskName.value.trim()) return // guard against empty
  const endpoint = 'http://localhost:8080/api'
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: newTaskName.value.trim(),
        status: 'todo', // explicitly send status
      }),
    })
    const newTask = await response.json()
    todos.value = [...todos.value, newTask] // append the new task
    newTaskName.value = '' // clear input
    toggleModal() // close modal
    console.log(`this item has been created${newTask}`)
  } catch (error) {
    console.log(error)
  }
}

// put req
const updateTask = async (id, stat) => {
  const endpoint = `http://localhost:8080/api/${id}`
  try {
    const response = await fetch(endpoint, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: stat,
      }),
    })
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}

// delete request
const deleteTask = async (id, array) => {
  const endpoint = `http://localhost:8080/api/${id}`
  try {
    const response = await fetch(endpoint, { method: 'DELETE' })
    console.log(response)
    array.value = array.value.filter((task) => task.id !== id)
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  todos.value = await getTodos()
  progresses.value = await getProgresses()
  dones.value = await getDones()
})

const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value
}

const handleDrop = async (list, status, event) => {
  const droppedTask = list[event.newIndex]
  if (!droppedTask) return

  const task = tasks.value.find((t) => t.id === droppedTask.id)
  if (task) task.status = status

  await updateTask(droppedTask.id, status)
}
</script>

<template>
  <div>
    <div v-if="isOld" class="h-screen bg-amber-600">
      <h1 class="text-7xl">Is this woking?</h1>
      <div v-if="loading">
        <h1 class="text-5xl">Laoding....</h1>
      </div>
      <div class="bg-green-400 my-7" v-else v-for="project in projects" :key="project.id">
        <h1>Name: {{ project.name }}</h1>
        <h2>Status: {{ project.status }}</h2>
      </div>
    </div>
    <div v-else class="grid grid-cols-3 justify-center gap-10 w-full">
      <teleport to="#modal" v-if="isModalOpen">
        <div class="modal-bg" @click="toggleModal">
          <div class="modal" @click.stop>
            <label for="name">Name: </label>
            <input type="text" id="name" placeholder="name.." v-model="newTaskName" />
            <button @click="createTask">Submit</button>
          </div>
        </div>
      </teleport>
      <KanCard :title="'ToDo'" @create="toggleModal">
        <draggable
          v-model="todos"
          item-key="id"
          group="tasks"
          @add="(e) => handleDrop(todos, 'todo', e)"
        >
          <template #item="{ element: task }">
            <KanTask
              :title="task.title"
              :status="task.status"
              @delete="deleteTask(task.id, todos)"
            />
          </template>
        </draggable>
      </KanCard>
      <KanCard :title="'Progress'">
        <draggable
          v-model="progresses"
          item-key="id"
          group="tasks"
          @add="(e) => handleDrop(progresses, 'progress', e)"
        >
          <template #item="{ element: task }">
            <KanTask
              :title="task.title"
              :status="task.status"
              @delete="deleteTask(task.id, progresses)"
            />
          </template>
        </draggable>
      </KanCard>
      <KanCard :title="'Done'">
        <draggable
          v-model="dones"
          item-key="id"
          group="tasks"
          @add="(e) => handleDrop(dones, 'done', e)"
        >
          <template #item="{ element: task }">
            <KanTask
              :title="task.title"
              :status="task.status"
              @delete="deleteTask(task.id, dones)"
            />
          </template>
        </draggable>
      </KanCard>
    </div>
  </div>
</template>

<style scoped>
.modal-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 1000;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 12px;
  width: 300px;
  max-width: 90%;

  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
<!-- TODO: I really hate writable computed properties -->
