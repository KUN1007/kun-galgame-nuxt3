<script setup lang="ts">
import type { SearchResultComment } from '~/types/api/search'

defineProps<{
  comment: SearchResultComment
}>()
</script>

<template>
  <KunLink
    color="default"
    underline="none"
    :to="`/topic/${comment.topicId}`"
    class="flex-col items-start"
  >
    <div class="flex items-center gap-2">
      <KunIcon class="text-primary h-5 w-5" name="uil:comment-dots" />
      <span class="text-lg">{{ comment.topicTitle }}</span>
      <span class="text-default-500 ml-auto text-sm">
        {{ formatTimeDifference(comment.created) }}
      </span>
    </div>

    <div
      class="border-primary bg-primary/10 my-2 rounded border-l-3 p-2 text-sm"
    >
      {{ comment.content }}
    </div>

    <div class="flex flex-wrap items-center gap-2">
      <div class="flex items-center">
        <KunAvatar :user="comment.user" />
        <span class="ml-2 text-sm">{{ comment.user.name }}</span>
      </div>
      <KunIcon name="lucide:arrow-right" class="h-4 w-4" />
      <div class="flex items-center">
        <KunAvatar :user="comment.targetUser" />
        <span class="ml-2 text-sm">{{ comment.targetUser.name }}</span>
      </div>
    </div>
  </KunLink>
</template>
