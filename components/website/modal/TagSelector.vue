<script setup lang="ts">
import { KUN_TAG_CATEGORY_TITLE } from '~/constants/galgameWebsite'
import type { WebsiteTag } from '~/types/api/website'

const props = withDefaults(
  defineProps<{
    tags: WebsiteTag[]
    tagIds: number[]
  }>(),
  {}
)

const emits = defineEmits<{
  updateIds: [ids: number[]]
}>()

const groupedTags = computed(() => {
  if (!props.tags) {
    return { radioGroups: {}, checkboxGroup: [] }
  }

  const groups: Record<string, WebsiteTag[]> = {}

  props.tags.forEach((tag) => {
    const category = tag.name.match(/^[a-z_]+/)?.[0] || tag.name
    if (!groups[category]) {
      groups[category] = []
    }
    groups[category].push(tag)
  })

  const radioGroups: Record<string, WebsiteTag[]> = {}
  const checkboxGroup: WebsiteTag[] = []

  for (const category in groups) {
    if (groups[category].length > 1) {
      radioGroups[category] = groups[category]
    } else {
      checkboxGroup.push(...groups[category])
    }
  }

  return { radioGroups, checkboxGroup }
})

const handleRadioChange = (newTagId: number, category: string) => {
  const isAlreadySelected = props.tagIds.includes(newTagId)
  if (isAlreadySelected) {
    const newIds = props.tagIds.filter((id) => id !== newTagId)
    emits('updateIds', newIds)
  } else {
    const categoryTagIds = groupedTags.value.radioGroups[category].map(
      (t) => t.id
    )
    const otherTagIds = props.tagIds.filter(
      (id) => !categoryTagIds.includes(id)
    )
    const newIds = [...otherTagIds, newTagId]
    emits('updateIds', newIds)
  }
}

const getSelectedRadioValue = (category: string): number | null => {
  const categoryTags = groupedTags.value.radioGroups[category]
  const selectedTag = categoryTags.find((tag) => props.tagIds.includes(tag.id))
  return selectedTag ? selectedTag.id : null
}

const handleCheckboxChange = (value: boolean, tagId: number) => {
  if (value) {
    if (!props.tagIds.includes(tagId)) {
      if (props.tagIds.length >= 20) {
        useMessage('您最多选择 20 个网站标签', 'warn')
        return
      }
      const newIds = [...props.tagIds, tagId]
      emits('updateIds', newIds)
    }
  } else {
    const newIds = props.tagIds.filter((id) => id !== tagId)
    emits('updateIds', newIds)
  }
}
</script>

<template>
  <div class="space-y-4">
    <fieldset
      v-for="(tagArr, category) in groupedTags.radioGroups"
      :key="category"
      class="border-default-200 rounded-md border p-3"
    >
      <legend class="text-default-700 px-2 text-sm font-semibold">
        {{ KUN_TAG_CATEGORY_TITLE[category] }}
      </legend>
      <div class="flex flex-wrap gap-x-4 gap-y-2 pt-2">
        <KunCheckBox
          v-for="tag in tagArr"
          :id="tag.name"
          :key="tag.id"
          :model-value="getSelectedRadioValue(category) === tag.id"
          @update:model-value="handleRadioChange(tag.id, category)"
          :label="tag.label"
          :value="tag.id"
          class-name="w-full p-1 hover:bg-default-100 rounded"
        />
      </div>
    </fieldset>

    <fieldset
      v-if="groupedTags.checkboxGroup.length > 0"
      class="border-default-200 rounded-md border p-3"
    >
      <legend class="text-default-700 px-2 text-sm font-semibold">
        {{ KUN_TAG_CATEGORY_TITLE['misc'] }}
      </legend>
      <div class="flex flex-wrap gap-x-4 gap-y-2 pt-2">
        <KunCheckBox
          v-for="tag in groupedTags.checkboxGroup"
          :id="tag.name"
          :key="tag.id"
          :model-value="tagIds.includes(tag.id)"
          @update:model-value="(value) => handleCheckboxChange(value, tag.id)"
          :label="tag.label"
          :value="tag.id"
          class-name="w-full p-1 hover:bg-default-100 rounded"
        />
      </div>
    </fieldset>
  </div>
</template>
