<script setup lang="ts">
import {
  KUN_GALGAME_TAG_CATEGORY_MAP,
  KUN_GALGAME_TAG_SPOILER_MAP,
  type KunGalgameTagCategory,
  type KunGalgameTagSpoiler
} from '~/constants/galgameTag'
import type { GalgameDetailTag } from '~/types/api/galgame'

const props = defineProps<{
  tags: GalgameDetailTag[]
}>()

const selectedCategories = ref<KunGalgameTagCategory[]>(['content'])
const selectedSpoilerLevels = ref<KunGalgameTagSpoiler[]>([0])

const toggleItemInArray = <T,>(arrayRef: Ref<T[]>, item: T) => {
  const index = arrayRef.value.indexOf(item)
  if (index === -1) {
    arrayRef.value.push(item)
  } else {
    arrayRef.value.splice(index, 1)
  }
}

const toggleCategory = (category: KunGalgameTagCategory) => {
  toggleItemInArray(selectedCategories, category)
}

const toggleSpoilerLevel = (spoiler: KunGalgameTagSpoiler) => {
  toggleItemInArray(selectedSpoilerLevels, spoiler)
}

const filteredTags = computed(() => {
  if (
    selectedCategories.value.length === 0 ||
    selectedSpoilerLevels.value.length === 0
  ) {
    return []
  }

  const filtered = props.tags.filter(
    (tag) =>
      selectedCategories.value.includes(tag.category) &&
      selectedSpoilerLevels.value.includes(tag.spoilerLevel as 0)
  )
  return filtered.sort((a, b) => a.id - b.id)
})
</script>

<template>
  <KunCard
    :is-hoverable="false"
    :is-pressable="false"
    :is-transparent="false"
    class-name="overflow-visible"
    content-class="space-y-3"
  >
    <KunScrollShadow shadow-size="5rem">
      <div class="flex w-fit items-center gap-3 whitespace-nowrap">
        <KunCheckBox
          v-for="(name, key) in KUN_GALGAME_TAG_CATEGORY_MAP"
          class-name="gap-2"
          :key="key"
          @click="toggleCategory(key)"
          :model-value="selectedCategories.includes(key)"
          color="primary"
        >
          {{ name }}
        </KunCheckBox>

        <KunCheckBox
          v-for="(name, key) in KUN_GALGAME_TAG_SPOILER_MAP"
          :key="key"
          class-name="gap-2"
          @click="toggleSpoilerLevel(Number(key) as KunGalgameTagSpoiler)"
          :model-value="selectedSpoilerLevels.includes(Number(key) as 0)"
          color="primary"
        >
          {{ name }}
        </KunCheckBox>
      </div>
    </KunScrollShadow>

    <KunScrollShadow
      axis="vertical"
      shadow-size="3rem"
      class-name="max-h-[200px] md:max-h-[400px]"
    >
      <TransitionGroup name="tag-list" tag="div" class="flex flex-wrap gap-3">
        <KunLink
          v-for="tag in filteredTags"
          :key="tag.id"
          underline="none"
          :to="`/galgame-tag/${tag.id}`"
        >
          <KunBadge class-name="bg-default-500/10 cursor-pointer" size="md">
            <span
              :class="
                cn(
                  'mr-1.5',
                  tag.category === 'content' && 'text-primary',
                  tag.category === 'sexual' && 'text-danger',
                  tag.category === 'technical' && 'text-success'
                )
              "
            >
              #
            </span>
            {{ tag.name }}
            <span class="text-default-500 text-xs">
              {{ `+${tag.galgameCount}` }}
            </span>
            <span v-if="tag.spoilerLevel > 0" class="text-warning-600 text-xs">
              {{ tag.spoilerLevel > 1 ? '(严重剧透)' : '(剧透)' }}
            </span>
          </KunBadge>
        </KunLink>
      </TransitionGroup>

      <KunNull
        v-if="filteredTags.length === 0"
        description="请至少选择一个类别来查看标签，或调整剧透等级"
      />
    </KunScrollShadow>
  </KunCard>
</template>

<style scoped>
.tag-list-move,
.tag-list-enter-active,
.tag-list-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.tag-list-enter-from,
.tag-list-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
.tag-list-leave-active {
  position: absolute;
}
</style>
