<script setup lang="ts">
import { topicCategory } from './utils/category'
import type { Category } from './utils/category'

const { category: rewriteCategory, isTopicRewriting } =
  storeToRefs(useTempEditStore())
const { category: editCategory } = storeToRefs(useKUNGalgameEditStore())

const selectedCategories = ref<string[]>([])

if (isTopicRewriting.value) {
  selectedCategories.value = rewriteCategory.value
} else {
  selectedCategories.value = editCategory.value
}

const handleClickCategory = (kun: Category) => {
  if (kun.index === 1 && selectedCategories.value.includes('Others')) {
    return
  }
  if (kun.index === 3 && selectedCategories.value.includes('Galgame')) {
    return
  }

  const index = selectedCategories.value.indexOf(kun.name)
  if (index !== -1) {
    selectedCategories.value.splice(index, 1)
  } else {
    selectedCategories.value.push(kun.name)
  }

  if (isTopicRewriting.value) {
    rewriteCategory.value = selectedCategories.value
    return
  }

  editCategory.value = selectedCategories.value
}
</script>

<template>
  <div class="categories">
    <span
      class="btn"
      v-for="kun in topicCategory"
      :key="kun.index"
      @click="handleClickCategory(kun)"
      :class="{ active: selectedCategories.includes(kun.name) }"
    >
      {{ $t(`edit.${kun.name}`) }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
.categories {
  height: 100%;
  display: flex;
  margin: 0 17px 17px 0;
}

.btn {
  height: 30px;
  padding: 0 17px;
  cursor: pointer;
  border: 1px solid var(--kungalgame-trans-blue-2);
  background-color: transparent;
  color: var(--kungalgame-blue-5);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  white-space: nowrap;

  &:nth-child(1) {
    border-radius: 17px 0 0 17px;
  }

  &:nth-child(2) {
    border-left: transparent;
    border-right: transparent;
  }

  &:last-child {
    border-radius: 0 17px 17px 0;
  }
}

.active {
  background-color: var(--kungalgame-blue-5);
  border: 1px solid var(--kungalgame-blue-5);
  color: var(--kungalgame-white);
}
</style>
