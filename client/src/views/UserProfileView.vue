<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import api from '@/services/api.js'
import KanButton from '@/components/ui/KanButton.vue'

const route = useRoute()

// const username = ref('')
// const initials = computed(() => username.value.slice(0, 2).toUpperCase())
const categories = ref([])
const newCategory = ref('')
const loading = ref(false)
// const addCategory = async () => { /* your API call */ }
// const deleteCategory = async (id) => { /* your API call */ }
// onMounted(fetchProfile)
// ──────────────────────────────────────────────────────────────

const getAllCategories = async () => {
  try {
    const { data } = await api.get('/api/category')
    console.log('CATEGORIES: ', data)
    categories.value = data
  } catch (error) {
    console.log(error)
  }
}

const createCategory = async () => {
  loading.value = true
  try {
    const response = await api.post('/api/category', {
      name: newCategory.value,
    })
    console.log('CREATED CATEGORY: ', response)
  } catch (error) {
    console.log(error)
  } finally {
    newCategory.value = ''
    loading.value = false
  }
}

const username = route.params.username ?? ''
const initials = username.slice(0, 2).toUpperCase()

onMounted(async () => {
  await getAllCategories()
})
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-10">
    <!-- ── Profile header ─────────────────────────────────── -->
    <header class="flex items-center gap-5 mb-10">
      <div
        class="flex items-center justify-center w-20 h-20 rounded-full bg-accent text-text-inverse font-display font-semibold text-2xl select-none shrink-0"
      >
        {{ initials }}
      </div>
      <div class="flex flex-col gap-1">
        <h1 class="font-display text-2xl font-semibold text-text-primary leading-none">
          {{ username }}
        </h1>
        <p class="text-sm text-text-secondary">Manage your profile and categories</p>
      </div>
    </header>

    <!-- ── Categories section ─────────────────────────────── -->
    <section class="bg-bg-raised border border-bg-border rounded-card p-6 flex flex-col gap-5">
      <div class="flex items-center justify-between">
        <h2 class="font-display text-lg font-semibold text-text-primary">Categories</h2>
        <span class="text-xs text-text-muted">Used across all your projects</span>
      </div>

      <!-- Add new category (wire @submit / @click yourself) -->
      <form class="flex gap-2" @submit.prevent="createCategory">
        <input
          type="text"
          placeholder="e.g. Design, Backend, Docs"
          class="flex-1 bg-bg-surface border border-bg-border text-text-primary placeholder:text-text-muted text-sm px-3.5 py-2.5 rounded-btn focus:outline-none focus:border-accent focus:shadow-input transition-all duration-150"
          v-model="newCategory"
        />
        <KanButton :loading="loading" type="submit" :btnTitle="'Add'" />
        <!-- TODO: better button style to try later -->
        <!-- <button
          type="submit"
          class="bg-accent text-text-inverse text-sm font-medium px-4 py-2.5 rounded-btn hover:bg-accent-dark transition-colors duration-150 cursor-pointer"
        >
          Add
        </button> -->
      </form>

      <!-- Category list -->
      <ul class="flex flex-col gap-2">
        <!-- Repeat per category — wire the v-for + key yourself -->
        <li
          v-for="category in categories"
          :key="category.id"
          class="flex items-center justify-between bg-bg-surface border border-bg-border rounded-btn px-3.5 py-2.5"
        >
          <span class="text-sm text-text-primary">{{ category.name }}</span>
          <button
            class="text-text-muted hover:text-danger transition-colors duration-150 cursor-pointer"
            aria-label="Delete category"
            @click="deleteCategory(category.id)"
          >
            <i class="fa-solid fa-trash text-sm"></i>
          </button>
        </li>

        <!-- Empty state -->
        <li v-if="!categories?.length" class="text-sm text-text-muted italic py-2">
          No categories yet — add one above.
        </li>
      </ul>
    </section>
  </div>
</template>
