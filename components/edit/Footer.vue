<script setup lang="ts">
import { topicCategory } from './utils/category'
import type { Category } from './utils/category'

const { category: rewriteCategory, isTopicRewriting } =
  storeToRefs(useTempEditStore())
const { isSaveTopic, category: editCategory } = storeToRefs(
  useKUNGalgameEditStore()
)

const selectedCategories = ref<string[]>([])

onBeforeMount(() => {
  if (isTopicRewriting.value) {
    selectedCategories.value = rewriteCategory.value
    return
  }

  if (isSaveTopic.value) {
    selectedCategories.value = editCategory.value
  }
})

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
  <div class="topic-group">
    <div>{{ $t('edit.categories') }}</div>
    <div class="group-btn">
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
  </div>

  <EditButton />
</template>

<style lang="scss" scoped>
.topic-group {
  width: 100%;
  margin-top: 20px;
  margin-bottom: 10px;
}

.group-btn {
  height: 100%;
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
}

.btn {
  height: 30px;
  width: 177px;
  font-size: 17px;
  cursor: pointer;
  border: 1px solid var(--kungalgame-blue-4);
  border-radius: 5px;
  background-color: var(--kungalgame-trans-white-9);
  color: var(--kungalgame-blue-4);
  display: flex;
  justify-content: center;
  align-items: center;

  &:nth-child(2) {
    margin: 0 10px;
  }
}

.active {
  transition: 0.2s;
  background-color: var(--kungalgame-blue-4);
  color: var(--kungalgame-white);
}
</style>
