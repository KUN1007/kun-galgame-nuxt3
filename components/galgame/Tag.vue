<script setup lang="ts">
import {
  KUN_GALGAME_TAG_CATEGORY_MAP,
  type KunGalgameTagCategory
} from '~/constants/galgame'
import type { KunUIColor } from '~/components/kun/ui/type'

export interface GalgameTag {
  id: number
  name: string
  category: 'content' | 'sexual' | 'technical'
}

const props = defineProps<{
  tags: GalgameTag[]
}>()

const colorMap: Record<string, KunUIColor> = {
  content: 'primary',
  sexual: 'danger',
  technical: 'success'
}
const selectedCategories = ref<KunGalgameTagCategory[]>(['content'])

const toggleCategory = (category: KunGalgameTagCategory) => {
  const index = selectedCategories.value.indexOf(category)
  if (index === -1) {
    selectedCategories.value.push(category)
  } else {
    selectedCategories.value.splice(index, 1)
  }
}

const filteredTags = computed(() => {
  if (selectedCategories.value.length === 0) {
    return []
  }
  const filtered = props.tags.filter((tag) =>
    selectedCategories.value.includes(tag.category)
  )
  return filtered.sort((a, b) => a.id - b.id)
})
</script>

<template>
  <KunCard
    :is-hoverable="false"
    :is-pressable="false"
    :is-transparent="false"
    content-class="space-y-3"
  >
    <div class="flex flex-wrap gap-3">
      <KunButton
        v-for="(name, key) in KUN_GALGAME_TAG_CATEGORY_MAP"
        size="sm"
        rounded="full"
        :key="key"
        @click="toggleCategory(key)"
        :variant="selectedCategories.includes(key) ? 'solid' : 'flat'"
        :color="selectedCategories.includes(key) ? colorMap[key] : 'default'"
      >
        {{ name }}
      </KunButton>
    </div>

    <div class="dark:border-gray-700">
      <TransitionGroup name="tag-list" tag="div" class="flex flex-wrap gap-3">
        <KunBadge
          class-name="bg-default-500/10"
          size="md"
          v-for="tag in filteredTags"
          :key="tag.id"
        >
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
        </KunBadge>
      </TransitionGroup>

      <KunNull
        v-if="filteredTags.length === 0"
        description="请至少选择一个类别来查看标签"
      />
    </div>
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
