<script setup>
import KanCard from '@/components/KanCard.vue'
import KanTask from '@/components/KanTask.vue'
import { useRoute } from 'vue-router'
import { ref, onMounted, computed } from 'vue'
import draggable from 'vuedraggable'
import KanModal from '@/components/ui/KanModal.vue'
import {
  getTodosById,
  getProgressesById,
  getDonesById,
  // getTaskById,
  createNewTask,
  updateTask,
  deleteTask,
} from '@/services/taskService.js'

const todos = ref([])
const progresses = ref([])
const dones = ref([])
const isModalOpen = ref(false)
const newTaskName = ref('')
const route = useRoute()

// const getTask = async () => {}

const projectId = route.params.id // reads "1" from /project/1/kanban

const getTodos = async () => {
  try {
    const { data } = await getTodosById(projectId)
    todos.value = data
  } catch (error) {
    console.log(error)
  }
}

const getProgresses = async () => {
  try {
    const { data } = await getProgressesById(projectId)
    progresses.value = data
  } catch (error) {
    console.log(error)
  }
}

const getDones = async () => {
  try {
    const { data } = await getDonesById(projectId)
    dones.value = data
  } catch (error) {
    console.log(error)
  }
}

// post request
const createTask = async () => {
  if (!newTaskName.value.trim()) return // guard against empty
  try {
    const { data } = await createNewTask(projectId, {
      title: newTaskName.value.trim(),
      status: 'todo',
    })
    todos.value = [...todos.value, data]
    newTaskName.value = ''
    toggleModal()
  } catch (error) {
    console.log(error)
  }
}

// put req
const update = async (id, stat) => {
  try {
    await updateTask(id, { status: stat })
  } catch (error) {
    console.log(error)
  }
}
console.log(update)

// delete request
const deleteTheTask = async (id, arrayName) => {
  try {
    await deleteTask(id)
    if (arrayName === 'todos') {
      todos.value = todos.value.filter((task) => task.id !== id)
    } else if (arrayName === 'progresses') {
      progresses.value = progresses.value.filter((task) => task.id !== id)
    } else if (arrayName === 'dones') {
      dones.value = dones.value.filter((task) => task.id !== id)
    }
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

const tasks = computed(() => {
  return [...todos.value, ...progresses.value, ...dones.value]
})
</script>

<template>
  <div>
    <header class="felx">
      <button @click="toggleModal" class="bg-bg-raised p-2 rounded ml-auto cursor-pointer">
        +New Task
      </button>
    </header>
    <div class="grid grid-cols-3 justify-center gap-10 w-full">
      <KanModal :isOpen="isModalOpen" @close="toggleModal">
        <label for="name">Name: </label>
        <input type="text" id="name" placeholder="name.." v-model="newTaskName" />
        <button @click="createTask">Submit</button>
      </KanModal>
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
              @delete="deleteTheTask(task.id, 'todos')"
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
              @delete="deleteTheTask(task.id, 'progresses')"
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
              @delete="deleteTheTask(task.id, 'dones')"
            />
          </template>
        </draggable>
      </KanCard>
    </div>
  </div>
</template>

<style scoped>
</style>
<!-- TODO: I really hate writable computed properties -->
