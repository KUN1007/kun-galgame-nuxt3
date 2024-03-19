<script setup lang="ts">
import { topicCategory } from './utils/category'

const {
  category: rewriteCategory,
  section: rewriteSection,
  isTopicRewriting
} = storeToRefs(useTempEditStore())
const { category: editCategory, section: editSection } = storeToRefs(
  useKUNGalgameEditStore()
)

const isShowSection = computed(
  () => editCategory.value.length || rewriteCategory.value.length
)

const isShowSelect = (name: string) => {
  return (
    editCategory.value.includes(name) || rewriteCategory.value.includes(name)
  )
}
</script>

<template>
  <div class="section" v-if="isShowSection">
    <div
      v-for="(select, index) in topicCategory"
      :key="index"
      v-show="isShowSelect(select.name)"
    >
      <KunSelect
        v-if="isShowSelect(select.name)"
        :styles="{ width: '150px' }"
        :options="select.options"
        :i18n="`edit.${select.i18n}`"
        position="top"
      >
        <span>{{ $t(`edit.${select.name}`) }}</span>
      </KunSelect>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 17px;
}
</style>
