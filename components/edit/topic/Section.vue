<script setup lang="ts">
import {
  galgameSection,
  techniqueSection,
  otherSection,
  topicCategory
} from '../utils/category'
import { intersection } from '../utils/intersection'
import type { KunSelectOption } from '~/components/kun/select/type'

const sectionMap: Record<string, KunSelectOption[]> = {
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
  usePersistEditTopicStore()
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
    const section = intersection(
      rewriteSection.value,
      sectionMap[name].map((s) => s.value)
    )
    if (!section.length) {
      rewriteSection.value.push(value)
    } else if (!rewriteSection.value.includes(value)) {
      rewriteSection.value = rewriteSection.value.filter(
        (item: string) => item !== section[0]
      )
      rewriteSection.value.push(value)
    }
  } else {
    const section = intersection(
      editSection.value,
      sectionMap[name].map((s) => s.value)
    )
    if (!section.length) {
      editSection.value.push(value)
    } else if (!editSection.value.includes(value)) {
      editSection.value = editSection.value.filter(
        (item: string) => item !== section[0]
      )
      editSection.value.push(value)
    }
  }
}
</script>

<template>
  <div class="flex items-center gap-2" v-if="isShowSection">
    分区

    <div
      v-for="(select, index) in topicCategory"
      :key="index"
      v-show="isShowSelect(select.name)"
      class="min-w-48"
    >
      <KunSelect
        v-if="isShowSelect(select.name)"
        :model-value="select.name"
        :options="select.options"
        @set="(value) => handleSetSection(select.name, value as string)"
        :placeholder="select.placeholder"
      >
        {{ select.name }}
      </KunSelect>
    </div>
  </div>
</template>
