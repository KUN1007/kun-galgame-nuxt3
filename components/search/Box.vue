<script setup lang="ts">
const { keywords } = storeToRefs(useTempSearchStore())

const input = ref<HTMLElement | null>(null)
const inputValue = ref('')

onBeforeMount(() => {
  keywords.value = ''
})

const debouncedSearch = debounce((inputValue: string) => {
  if (inputValue.trim()) {
    keywords.value = inputValue
  } else {
    keywords.value = ''
  }
}, 500)

watch(
  () => keywords.value,
  () => {
    if (!inputValue.value) {
      inputValue.value = keywords.value
    }
  }
)

onMounted(() => {
  if (input.value) {
    input.value?.focus()
  }
})
</script>

<template>
  <input
    ref="input"
    v-model="inputValue"
    type="search"
    class="input"
    :placeholder="`${$t('search.placeholder')}`"
    @input="debouncedSearch(inputValue)"
    @keydown.enter="debouncedSearch(inputValue)"
  />
</template>

<style lang="scss" scoped>
.input {
  padding: 0 15px;
  height: 40px;
  width: 100%;
  font-size: 16px;
  border: none;
  background-color: transparent;
  border: 2px solid var(--kungalgame-blue-5);
  border-radius: 10px;
  color: var(--kungalgame-font-color-3);
  transition: all 0.2s;

  &:focus {
    border: 2px solid var(--kungalgame-pink-4);
  }

  &::placeholder {
    color: var(--kungalgame-font-color-1);
  }
}
</style>
