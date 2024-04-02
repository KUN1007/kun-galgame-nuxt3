<script setup lang="ts">
import {
  galgameSection,
  techniqueSection,
  otherSection,
  topicCategory
} from '../utils/category'
import { intersection } from '../utils/intersection'

const sectionMap: Record<string, string[]> = {
  Galgame: galgameSection,
  Technique: techniqueSection,
  Others: otherSection
}

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

const handleSetSection = (name: string, value: string) => {
  if (isTopicRewriting.value) {
    const section = intersection(rewriteSection.value, sectionMap[name])
    if (!section.length) {
      rewriteSection.value.push(value)
    } else if (!rewriteSection.value.includes(value)) {
      rewriteSection.value = rewriteSection.value.filter(
        (item) => item !== section[0]
      )
      rewriteSection.value.push(value)
    }
  } else {
    const section = intersection(editSection.value, sectionMap[name])
    if (!section.length) {
      editSection.value.push(value)
    } else if (!editSection.value.includes(value)) {
      editSection.value = editSection.value.filter(
        (item) => item !== section[0]
      )
      editSection.value.push(value)
    }
  }
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
        i18n="edit.topic.section"
        @set="(value) => handleSetSection(select.name, value)"
        position="top"
      >
        <span>{{ $t(`edit.topic.${select.name}`) }}</span>
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
