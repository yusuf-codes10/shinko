<script setup>
import KanCard from '@/components/KanCard.vue'
import KanTask from '@/components/KanTask.vue'
import { ref, onMounted, computed } from 'vue'
import draggable from 'vuedraggable'

const projects = ref([])
const loading = ref(false)
const isOld = ref(false)
const tasks = ref([])
const isModalOpen = ref(false)
const newTaskName = ref('')

// get all
const getAllTasks = async () => {
  const endpoint = `http://localhost:8080/api`
  try {
    const response = await fetch(endpoint)
    const data = await response.json()
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
    // tasks.value = []
  }
}

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
    tasks.value = [...tasks.value, newTask] // append the new task
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
const deleteTask = async (id) => {
  const endpoint = `http://localhost:8080/api/${id}`
  try {
    const response = await fetch(endpoint, { method: 'DELETE' })
    console.log(response)
    tasks.value = tasks.value.filter((task) => task.id !== id)
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  const result = await getAllTasks()
  console.log('raw result:', result, Array.isArray(result))
  // no status whatsoever
  tasks.value = result
})

const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value
}

const taskOnProgress = async (event) => {
  // ✅ Use event.item's data-id attribute, or find by title as fallback
  const droppedTask = progressTasks.value[event.newIndex]
  if (!droppedTask) return

  // ✅ Mutate the original tasks array directly — don't re-filter
  const task = tasks.value.find((t) => t.id === droppedTask.id)
  if (task) task.status = 'progress' // this already triggers computed to update

  await updateTask(droppedTask.id, 'progress')
}

const taskOnTodo = async (event) => {
  const droppedTask = todoTasks.value[event.newIndex]
  if (!droppedTask) return

  const task = tasks.value.find((t) => t.id === droppedTask.id)
  if (task) task.status = 'todo'

  await updateTask(droppedTask.id, 'todo')
}

// since splitting the tasks to ['todo', 'progress', 'done'] is mostly ui, vue should handle it with computed properties
const todoTasks = computed({
  get: () => tasks.value.filter((task) => task.status === 'todo'),
  set: (val) => {
    // ✅ Only sync items that moved INTO this column
    val.forEach((item) => {
      const task = tasks.value.find((t) => t.id === item.id)
      if (task && task.status !== 'todo') task.status = 'todo'
    })
  },
})

const progressTasks = computed({
  get: () => tasks.value.filter((task) => task.status === 'progress'),
  set: (val) => {
    val.forEach((item) => {
      const task = tasks.value.find((t) => t.id === item.id)
      if (task && task.status !== 'progress') task.status = 'progress'
    })
  },
})
console.log(todoTasks.value)
console.log(progressTasks.value)
// const completedTasks = computed(() => tasks.value.filter((task) => task.status === 'done'))
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
        Card 1
        <draggable v-model="todoTasks" item-key="id" group="tasks" @add="taskOnTodo">
          <template #item="{ element: task }">
            <KanTask :title="task.title" :status="task.status" @delete="deleteTask(task.id)" />
          </template>
        </draggable>
      </KanCard>
      <KanCard :title="'Progress'">
        <draggable v-model="progressTasks" item-key="id" group="tasks" @add="taskOnProgress">
          <template #item="{ element: task }">
            <KanTask :title="task.title" :status="task.status" @delete="deleteTask(task.id)" />
          </template>
        </draggable>
      </KanCard>
      <KanCard :title="'Done'"> Card 3 </KanCard>
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
