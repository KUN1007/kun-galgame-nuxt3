<script setup lang="ts">
import type { HomeTopic } from '~/types/api/home'

defineProps<{
  topic: HomeTopic
  isTransparent?: boolean
}>()
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

      <span class="text-default-500 shrink-0 text-sm">
        {{ formatTimeDifference(topic.time) }}
      </span>
    </div>

    <div
      class="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
    >
      <TopicTagGroup
        :section="topic.section"
        :tags="topic.tags"
        :upvote-time="topic.upvoteTime"
      />

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
