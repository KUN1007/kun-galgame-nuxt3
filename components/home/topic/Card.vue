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
    :to="`/topic/${topic.id}`"
  >
    <div class="flex w-full items-center justify-between gap-4">
      <h3
        class="hover:text-primary line-clamp-2 text-base font-medium transition-colors sm:text-lg"
      >
        {{ topic.title }}
      </h3>

      <span class="text-default-500 shrink-0 text-sm">
        {{ formatTimeDifference(topic.statusUpdateTime) }}
      </span>
    </div>

    <div class="flex w-full flex-wrap items-center justify-between gap-2">
      <TopicTagGroup
        :section="topic.section"
        :tags="topic.tag"
        :upvote-time="topic.upvoteTime"
        :has-best-answer="topic.hasBestAnswer"
        :is-poll-topic="topic.isPollTopic"
        :is-n-s-f-w-topic="topic.isNSFWTopic"
      />

      <div class="text-default-700 flex items-center gap-4 text-sm">
        <span class="flex items-center gap-1">
          <KunIcon name="lucide:eye" class="h-4 w-4" />
          {{ formatNumber(topic.view) }}
        </span>
        <span class="flex items-center gap-1">
          <KunIcon name="lucide:thumbs-up" class="h-4 w-4" />
          {{ topic.likeCount }}
        </span>
        <span class="flex items-center gap-1">
          <KunIcon name="carbon:reply" class="h-4 w-4" />
          {{ topic.replyCount + topic.commentCount }}
        </span>
      </div>
    </div>
  </KunLink>
</template>
