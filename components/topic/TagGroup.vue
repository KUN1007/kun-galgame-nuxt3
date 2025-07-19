<script setup lang="ts">
const props = defineProps<{
  section: string[]
  tags: string[]
  upvoteTime?: Date | string | null
  hasBestAnswer?: boolean
}>()

const isRecentlyUpvoted = computed(() => hourDiff(props.upvoteTime || 0, 10))
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

    <TopicDetailSection :section="props.section" />

    <template v-if="props.tags">
      <KunBadge v-for="(tag, index) in props.tags" :key="index">
        {{ tag }}
      </KunBadge>
    </template>
  </div>
</template>
