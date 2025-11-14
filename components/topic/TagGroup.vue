<script setup lang="ts">
import { KUN_TOPIC_SECTION } from '~/constants/topic'
import type { KunUIColor, KunUISize } from '~/components/kun/ui/type'

const props = withDefaults(
  defineProps<{
    section: string[]
    tags: string[]
    upvoteTime?: Date | string | null
    hasBestAnswer?: boolean
    isPollTopic?: boolean
    isNSFWTopic?: boolean
    isNavToSection?: boolean
  }>(),
  {
    upvoteTime: null,
    isNavToSection: false
  }
)

const iconMap: Record<string, string> = {
  g: 'lucide:gamepad-2',
  t: 'lucide:drafting-compass',
  o: 'lucide:circle-ellipsis'
}

const sectionColors: Record<string, KunUIColor> = {
  g: 'primary',
  t: 'success',
  o: 'secondary'
}

const isRecentlyUpvoted = computed(() => hourDiff(props.upvoteTime || 0, 24))

const handleClickSection = async (section: string) => {
  if (props.isNavToSection) {
    await navigateTo(`/section/${section}`)
  }
}
</script>

<template>
  <div class="flex flex-wrap items-center gap-2">
    <KunBadge
      variant="solid"
      color="warning"
      v-if="upvoteTime && isRecentlyUpvoted"
    >
      <KunIcon name="lucide:sparkles" class="size-4 text-inherit" />
      <span class="text-inherit">该话题被推</span>
    </KunBadge>

    <span v-if="hasBestAnswer" class="flex gap-1">
      <KunBadge variant="solid" color="success">
        <KunIcon name="lucide:bookmark-check" class="size-4 text-inherit" />
        有解答
      </KunBadge>
    </span>

    <span v-if="isPollTopic" class="flex gap-1">
      <KunBadge variant="solid" color="primary">
        <KunIcon name="lucide:bar-chart-3" class="size-4 text-inherit" />
        投票话题
      </KunBadge>
    </span>

    <span v-if="isNSFWTopic" class="flex gap-1">
      <KunBadge variant="solid" color="primary" class-name="bg-orange-600">
        <KunIcon name="uil:18-plus" class="size-4 text-inherit" />
        NSFW 话题
      </KunBadge>
    </span>

    <span class="flex gap-1">
      <KunBadge
        v-for="(sec, index) in props.section"
        :key="index"
        :color="sectionColors[sec.toLowerCase()[0]]"
        @click="handleClickSection(sec.toLowerCase())"
        :class-name="cn(props.isNavToSection ? 'cursor-pointer' : '')"
      >
        <KunIcon
          :name="iconMap[sec.toLowerCase()[0]]"
          class="size-4 text-inherit"
        />
        {{ KUN_TOPIC_SECTION[sec] }}
      </KunBadge>
    </span>

    <template v-if="props.tags">
      <KunBadge v-for="(tag, index) in props.tags" :key="index">
        {{ tag }}
      </KunBadge>
    </template>
  </div>
</template>
