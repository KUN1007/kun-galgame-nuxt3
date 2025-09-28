<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import type { GalgameSearchSearchItem } from '~/types/api/galgame-series'

const props = defineProps<{
  modelValue: number[]
  label?: string
  required?: boolean
}>()

const emits = defineEmits<{
  'update:modelValue': [value: number[]]
}>()

const searchTerm = ref('')
const searchResults = ref<GalgameSearchSearchItem[]>([])
const selectedGalgames = ref<GalgameSearchSearchItem[]>([])
const isLoading = ref(false)
const isDropdownOpen = ref(false)
const wrapperRef = ref<HTMLElement | null>(null)

const internalIds = computed({
  get: () => props.modelValue,
  set: (newValue) => emits('update:modelValue', newValue)
})

const handleSearch = useDebounceFn(async () => {
  if (searchTerm.value.length < 1) {
    searchResults.value = []
    isDropdownOpen.value = false
    return
  }
  isLoading.value = true

  const data = await $fetch('/api/galgame-series/search', {
    method: 'GET',
    query: { keywords: searchTerm.value }
  })

  searchResults.value = data.filter(
    (result) => !internalIds.value.includes(result.id)
  )
  isDropdownOpen.value = true
  isLoading.value = false
}, 300)

const selectGame = (game: GalgameSearchSearchItem) => {
  selectedGalgames.value.push(game)
  internalIds.value = [...internalIds.value, game.id]

  searchTerm.value = ''
  searchResults.value = []
  isDropdownOpen.value = false
}

const removeGame = (gameId: number) => {
  selectedGalgames.value = selectedGalgames.value.filter((g) => g.id !== gameId)
  internalIds.value = internalIds.value.filter((id) => id !== gameId)
}

const syncSelectedGalgames = async (ids: number[]) => {
  if (!ids || ids.length === 0) {
    selectedGalgames.value = []
    return
  }

  const currentIds = selectedGalgames.value.map((g) => g.id)
  if (JSON.stringify(currentIds.sort()) === JSON.stringify(ids.sort())) {
    return
  }

  isLoading.value = true

  const data = await $fetch('/api/galgame-series/modal', {
    method: 'POST',
    body: { ids }
  })
  selectedGalgames.value = data
  isLoading.value = false
}

watch(() => props.modelValue, syncSelectedGalgames, { immediate: true })

const handleBlur = () => {
  setTimeout(() => {
    isDropdownOpen.value = false
  }, 150)
}
</script>

<template>
  <div ref="wrapperRef" class="relative">
    <label v-if="label" class="text-default-700 mb-1 block text-sm font-medium">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <div
      class="border-default-300 focus-within:border-primary-500 focus-within:ring-primary-500 flex min-h-[38px] flex-wrap items-center gap-2 rounded-md border p-2 focus-within:ring-1"
    >
      <span
        v-for="game in selectedGalgames"
        :key="game.id"
        class="bg-primary-100 text-primary-800 flex items-center gap-1.5 rounded px-2 py-0.5 text-sm"
      >
        {{ game.name }}
        <button
          type="button"
          class="text-primary-600 hover:text-primary-900 font-bold"
          @click.stop="removeGame(game.id)"
        >
          ×
        </button>
      </span>

      <input
        v-model="searchTerm"
        type="text"
        class="min-w-[100px] flex-1 border-none bg-transparent p-0 outline-none focus:ring-0"
        placeholder="搜索并添加 Galgame..."
        @input="handleSearch"
        @focus="isDropdownOpen = true"
        @blur="handleBlur"
      />
    </div>

    <div
      v-if="isDropdownOpen && (searchResults.length > 0 || isLoading)"
      class="border-default-300 bg-background absolute z-10 mt-1 w-full rounded-md border"
    >
      <ul class="max-h-60 overflow-auto py-1">
        <li v-if="isLoading" class="text-default-500 px-4 py-2">正在搜索...</li>
        <li
          v-for="result in searchResults"
          :key="result.id"
          class="hover:bg-default-100 cursor-pointer px-4 py-2"
          @mousedown.prevent="selectGame(result)"
        >
          {{ result.name }}
        </li>
      </ul>
    </div>
  </div>
</template>
