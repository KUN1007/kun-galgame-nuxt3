<script setup lang="ts">
import { ref, onBeforeMount, onMounted, watch } from 'vue'

import { debounce } from '@/utils/debounce'

import { useTempHomeStore } from '@/store/temp/home'
import { storeToRefs } from 'pinia'

const { search } = storeToRefs(useTempHomeStore())

const input = ref<HTMLElement | null>(null)
const inputValue = ref('')

onBeforeMount(() => {
  search.value.keywords = ''
})

const debouncedSearch = debounce((inputValue: string) => {
  if (inputValue.trim()) {
    search.value.keywords = inputValue
  } else {
    search.value.keywords = ''
  }
}, 300)

const searchTopics = () => {
  debouncedSearch(inputValue.value)
}

watch(
  () => search.value.keywords,
  () => {
    if (!inputValue.value) {
      inputValue.value = search.value.keywords
    }
  }
)

onMounted(() => {
  if (input) {
    input.value?.focus()
  }
})
</script>

<template>
  <div class="search-form">
    <input
      ref="input"
      v-model="inputValue"
      type="search"
      class="input"
      :placeholder="`${$tm('mainPage.header.search')}`"
      @input="debouncedSearch(inputValue)"
      @keydown.enter="searchTopics"
    />
  </div>
</template>

<style lang="scss" scoped>
.search-form {
  position: sticky;
  top: 0;
  width: 100%;
  max-width: 777px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 17px;
  background-color: var(--kungalgame-trans-white-2);
  backdrop-filter: blur(5px);
}

.input {
  padding: 0 15px;
  height: 40px;
  width: 100%;
  font-size: 16px;
  border: none;
  background-color: var(--kungalgame-trans-white-9);
  border: 2px solid var(--kungalgame-blue-4);
  border-radius: 17px;
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
