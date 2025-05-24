<script setup lang="ts">
import type { SearchResultReply, SearchResultComment } from '~/types/api/search'

const props = defineProps<{
  data: SearchResultReply | SearchResultComment
  type: 'reply' | 'comment'
}>()

const content = computed(() =>
  props.type === 'reply'
    ? markdownToText(props.data.content)
    : props.data.content
)
</script>

<template>
  <KunLink
    color="default"
    underline="none"
    :to="`/topic/${data.tid}`"
    class="flex-col items-start"
  >
    <div class="flex items-center gap-2">
      <KunIcon
        class="text-primary h-5 w-5"
        :name="type === 'reply' ? 'carbon:reply' : 'uil:comment-dots'"
      />
      <span class="text-lg">{{ data.title }}</span>
      <span class="text-default-500 ml-auto text-sm">
        {{ formatTimeDifference(data.time) }}
      </span>
    </div>

    <div
      class="border-primary bg-primary/10 my-2 rounded border-l-3 p-2 text-sm"
    >
      {{ type === 'reply' ? markdownToText(content) : content }}
    </div>

    <div class="flex flex-wrap items-center gap-2">
      <div class="flex items-center">
        <KunAvatar :user="data.user" />
        <span class="ml-2 text-sm">{{ data.user.name }}</span>
      </div>
      <KunIcon name="lucide:arrow-right" class="h-4 w-4" />
      <div class="flex items-center">
        <KunAvatar :user="data.toUser" />
        <span class="ml-2 text-sm">{{ data.toUser.name }}</span>
      </div>
    </div>
  </KunLink>
</template>
