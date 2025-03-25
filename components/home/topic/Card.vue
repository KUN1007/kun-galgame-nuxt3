<script setup lang="ts">
import type { HomeTopic } from '~/types/api/home'

const props = defineProps<{
  topic: HomeTopic
  isTransparent?: boolean
}>()

const isRecentlyUpvoted = computed(() => {
  const hoursSinceUpvote =
    (Date.now() - props.topic.upvoteTime) / (1000 * 60 * 60)
  return hoursSinceUpvote <= 10
})
</script>

<template>
  <KunLink
    underline="none"
    class-name="flex-col items-start w-full"
    :to="`/topic/${topic.tid}`"
  >
    <div class="flex w-full items-center justify-between gap-4">
      <h3
        class="hover:text-primary line-clamp-2 text-lg font-medium transition-colors"
      >
        {{ topic.title }}
      </h3>

      <div class="flex items-center gap-3">
        <KunBadge color="warning" v-if="isRecentlyUpvoted">
          <KunIcon name="lucide:sparkles" class="size-4 text-inherit" />
          <span class="text-inherit">该话题被推</span>
        </KunBadge>
        <span class="text-default-500 shrink-0 text-sm">
          {{ formatTimeDifference(topic.time) }}
        </span>
      </div>
    </div>

    <div
      class="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
    >
      <TopicTagGroup :section="topic.section" :tags="topic.tags" />

      <div class="text-default-700 flex items-center gap-4 text-sm">
        <span class="flex items-center gap-1">
          <KunIcon name="lucide:eye" class="h-4 w-4" />
          {{ topic.views }}
        </span>
        <span class="flex items-center gap-1">
          <KunIcon name="lucide:thumbs-up" class="h-4 w-4" />
          {{ topic.likes }}
        </span>
        <span class="flex items-center gap-1">
          <KunIcon name="carbon:reply" class="h-4 w-4" />
          {{ topic.replies + topic.comments }}
        </span>
      </div>
    </div>
  </KunLink>
</template>
