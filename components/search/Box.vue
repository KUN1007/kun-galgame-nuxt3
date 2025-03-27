<script setup lang="ts">
const { searchHistory } = storeToRefs(usePersistKUNGalgameSearchStore())
const { keywords } = storeToRefs(useTempSearchStore())

const isFocus = ref(false)
const input = ref<HTMLElement | null>(null)
const inputValue = ref('')

onBeforeMount(() => {
  keywords.value = ''
})

const debouncedSearch = debounce((inputValue: string) => {
  keywords.value = inputValue.trim() || ''
}, 500)

watch(
  () => keywords.value,
  () => {
    if (!inputValue.value) {
      inputValue.value = keywords.value
    }
  }
)

onMounted(() => input.value?.focus())

const handleInputBlur = () => {
  isFocus.value = false
  if (!keywords.value.trim()) {
    return
  }

  if (!searchHistory.value.includes(keywords.value)) {
    searchHistory.value.push(keywords.value)
  }
}
</script>

<template>
  <KunInput
    ref="input"
    v-model="inputValue"
    type="search"
    size="lg"
    :color="isFocus ? 'primary' : 'default'"
    placeholder="输入内容以自动搜索"
    @focus="isFocus = true"
    @blur="handleInputBlur"
    @input="debouncedSearch(inputValue)"
    @keydown.enter="debouncedSearch(inputValue)"
  />
</template>
