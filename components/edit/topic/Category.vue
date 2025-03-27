<script setup lang="ts">
import { topicCategory } from '../utils/category'
import { KUN_TOPIC_CATEGORY } from '~/constants/topic'
import type { Category } from '../utils/category'

const {
  category: rewriteCategory,
  section: rewriteSection,
  isTopicRewriting
} = storeToRefs(useTempEditStore())
const { category: editCategory, section: editSection } = storeToRefs(
  usePersistEditTopicStore()
)

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
    rewriteSection.value = []
  } else {
    editCategory.value = selectedCategories.value
    editSection.value = []
  }
}
</script>

<template>
  <div class="flex items-center gap-2">
    分类

    <KunButton
      class="btn"
      v-for="kun in topicCategory"
      :key="kun.index"
      @click="handleClickCategory(kun)"
      :variant="selectedCategories.includes(kun.name) ? 'solid' : 'flat'"
      size="sm"
    >
      {{ KUN_TOPIC_CATEGORY[kun.name.toLowerCase()] }}
    </KunButton>
  </div>
</template>
