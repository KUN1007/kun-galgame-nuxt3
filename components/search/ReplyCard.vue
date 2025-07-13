<script setup lang="ts">
import type { SearchResultReply } from '~/types/api/search'

defineProps<{
  reply: SearchResultReply
}>()
</script>

<template>
  <KunLink
    color="default"
    underline="none"
    :to="`/topic/${reply.topicId}`"
    class="flex-col items-start"
  >
    <div class="flex items-center gap-2">
      <KunIcon class="text-primary h-5 w-5" name="carbon:reply" />
      <span class="text-lg">{{ reply.topicTitle }}</span>
      <span class="text-default-500 ml-auto text-sm">
        {{ formatTimeDifference(reply.created) }}
      </span>
    </div>

    <div v-if="reply.content" class="my-2 rounded">
      <div class="mb-2 flex items-center">
        <KunAvatar :user="reply.user" />
        <span class="ml-2 text-sm">{{ reply.user.name }}</span>
      </div>
      {{ reply.content }}
    </div>

    <template v-for="(target, index) in reply.targets" :key="index">
      <div
        class="border-primary bg-primary/10 my-2 rounded border-l-3 p-2 text-sm"
      >
        <div class="flex items-center gap-2">
          <div class="flex items-center">
            <KunAvatar :user="reply.user" />
            <span class="ml-2 text-sm">{{ reply.user.name }}</span>
          </div>
          <KunIcon name="lucide:arrow-right" class="h-4 w-4" />
          <div class="flex items-center">
            <KunAvatar :user="target.user" />
            <span class="ml-2 text-sm">{{ target.user.name }}</span>
          </div>
        </div>

        <p class="text-default-500 mt-1 line-clamp-2 text-sm italic">
          {{ target.contentPreview }}
        </p>

        {{ target.content }}
      </div>
    </template>
  </KunLink>
</template>
