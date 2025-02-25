<script setup lang="ts">
import type { HomeTopic } from '~/types/api/home'

const props = defineProps<{
  topic: HomeTopic
}>()

const isRecentlyUpvoted = computed(() => {
  const hoursSinceUpvote =
    (Date.now() - props.topic.upvoteTime) / (1000 * 60 * 60)
  return hoursSinceUpvote <= 10
})
</script>

<template>
  <NuxtLink
    :to="`/topic/${topic.tid}`"
    class="group relative flex flex-col gap-3 rounded-lg border p-4 shadow transition-all hover:shadow-md"
  >
    <!-- Title and Time -->
    <div class="flex items-start justify-between gap-4">
      <h3
        class="line-clamp-2 text-lg font-medium text-gray-900 dark:text-gray-100"
      >
        {{ topic.title }}
      </h3>

      <div class="flex items-center gap-3">
        <span
          v-if="isRecentlyUpvoted"
          class="flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200"
        >
          <Icon name="lucide:sparkles" class="h-3 w-3" />
          <span>该话题被推</span>
        </span>
        <span class="shrink-0 text-sm text-gray-500 dark:text-gray-400">
          {{ formatTimeDifference(topic.time) }}
        </span>
      </div>
    </div>

    <!-- User Info and Tags -->
    <div
      class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
    >
      <div class="flex flex-wrap items-center gap-2">
        <TopicSection :section="topic.section" />
        <TopicTags :tags="topic.tags" :is-show-icon="false" />
      </div>

      <!-- Engagement Stats -->
      <div
        class="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400"
      >
        <span class="flex items-center gap-1">
          <Icon name="lucide:mouse-pointer-click" class="h-4 w-4" />
          {{ topic.views }}
        </span>
        <span class="flex items-center gap-1">
          <Icon name="lucide:thumbs-up" class="h-4 w-4" />
          {{ topic.likes }}
        </span>
        <span class="flex items-center gap-1">
          <Icon name="lucide:reply" class="h-4 w-4" />
          {{ topic.replies + topic.comments }}
        </span>
      </div>
    </div>
  </NuxtLink>
</template>
