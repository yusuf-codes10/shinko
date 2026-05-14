<script setup>
import KanCard from '@/components/KanCard.vue'
import KanTask from '@/components/KanTask.vue'
import { useRoute } from 'vue-router'
import { ref, onMounted, computed } from 'vue'
import draggable from 'vuedraggable'
import KanModal from '@/components/ui/KanModal.vue'
import api from '@/services/api.js'
import KanButton from '@/components/ui/KanButton.vue'

const todos = ref([])
const progresses = ref([])
const dones = ref([])
const isModalOpen = ref(false)
const newTaskName = ref('')
const newTaskCategory = ref('')
const route = useRoute()
const btnLoading = ref(false)

// const getTask = async () => {}

const projectId = route.params.id // reads "1" from /project/1/kanban

const getTodos = async () => {
  try {
    const { data } = await api.get(`/api/task/todo/${projectId}`)
    todos.value = data
    console.log(data)
    console.log(Array.isArray(data))
  } catch (error) {
    console.log(error)
  }
}

const getProgresses = async () => {
  try {
    const { data } = await api.get(`/api/task/progress/${projectId}`)
    progresses.value = data
  } catch (error) {
    console.log(error)
  }
}

const getDones = async () => {
  try {
    const { data } = await api.get(`/api/task/done/${projectId}`)
    dones.value = data
  } catch (error) {
    console.log(error)
  }
}

// post request
const createTask = async () => {
  if (!newTaskName.value.trim() || !newTaskCategory.value.trim()) return // guard against empty
  btnLoading.value = true
  try {
    const { data } = await api.post(`/api/task/${projectId}`, {
      title: newTaskName.value.trim(),
      category: newTaskCategory.value.trim(),
      status: 'todo',
    })
    console.log(data)
    // todos.value = [...todos.value, data]
    todos.value.push(data)
    newTaskName.value = ''
    newTaskCategory.value = ''
    toggleModal()
  } catch (error) {
    console.log(error)
  } finally {
    btnLoading.value = false
  }
}

// put req
const update = async (id, stat) => {
  console.log('id:', id)
  console.log('status:', stat)
  try {
    await api.put(`/api/task/${id}`, { status: stat })
  } catch (error) {
    console.log(error)
  }
}
console.log(update)

// delete request
const deleteTheTask = async (id, arrayName) => {
  try {
    await api.delete(`/api/task/${id}`)
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
  await getTodos()
  await getProgresses()
  await getDones()
})

const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value
}

const handleDrop = async (list, status, event) => {
  const droppedTask = list[event.newIndex]
  if (!droppedTask) return

  const task = tasks.value.find((t) => t.id === droppedTask.id)
  if (task) task.status = status

  await update(droppedTask.id, status)
}

const tasks = computed(() => {
  return [...todos.value, ...progresses.value, ...dones.value]
})

// computed properties for count
const todosCount = computed(() => todos.value.length)
const progressesCount = computed(() => progresses.value.length)
const donesCount = computed(() => dones.value.length)

const checkedTaskName = computed(() => !!newTaskName.value)
</script>

<template>
  <div>
    <header class="felx">
      <KanButton :isDisabled="true" @click="toggleModal" :btnTitle="'+New Task'" />
    </header>
    <div class="grid grid-cols-3 justify-center gap-10 w-full">
      <KanModal :isOpen="isModalOpen" :title="'Task'" @close="toggleModal">
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-medium text-text-secondary">Task title</label>
          <input
            type="text"
            placeholder="Task title"
            class="w-full bg-bg-raised border border-bg-border text-text-primary placeholder:text-text-muted text-sm px-3.5 py-2.5 rounded-btn focus:outline-none focus:border-accent focus:shadow-input transition-all duration-150"
            v-model="newTaskName"
          />
          <label class="text-xs font-medium text-text-secondary">Task category</label>
          <input
            type="text"
            placeholder="Task category"
            class="w-full bg-bg-raised border border-bg-border text-text-primary placeholder:text-text-muted text-sm px-3.5 py-2.5 rounded-btn focus:outline-none focus:border-accent focus:shadow-input transition-all duration-150"
            v-model="newTaskCategory"
          />
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-medium text-text-secondary">Description</label>
            <textarea
              placeholder="Task Description"
              rows="3"
              class="w-full bg-bg-raised border border-bg-border text-text-primary placeholder:text-text-muted text-sm px-3.5 py-2.5 rounded-btn resize-none focus:outline-none focus:border-accent focus:shadow-input transition-all duration-150"
            />
          </div>
          <KanButton
            :loading="btnLoading"
            :isDisabled="checkedTaskName"
            @click="createTask"
            :btnTitle="'Submit'"
          />
        </div>
      </KanModal>
      <KanCard :title="'ToDo'" :count="todosCount">
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
      <KanCard :title="'Progress'" :count="progressesCount">
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
      <KanCard :title="'Done'" :count="donesCount">
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
