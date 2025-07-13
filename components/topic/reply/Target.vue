<script setup lang="ts">
import { scrollPage } from '../_helper'
import type { TopicReplyTargetInfo } from '~/types/api/topic-reply'

const props = defineProps<{
  target: TopicReplyTargetInfo
  isLoading: boolean
}>()

const emit = defineEmits<{
  loadDetail: [id: number]
}>()

const handleClick = () => {
  const success = scrollPage(props.target.floor)
  if (!success) {
    emit('loadDetail', props.target.id)
  }
}
</script>

<template>
  <div
    @click="handleClick"
    class="group hover:border-primary-500 dark:hover:border-primary-400 border-default-300 bg-default-100 hover:bg-default-200/60 dark:border-default-600 dark:bg-default-700/50 dark:hover:bg-default-700 cursor-pointer rounded-md border-l-2 p-3 transition-all duration-200"
  >
    <div class="flex flex-wrap items-center gap-x-2 text-sm">
      <span class="text-default-600 dark:text-default-300">回复</span>
      <KunLink
        underline="hover"
        size="sm"
        :to="`/user/${target.user.id}/info`"
        class-name="font-bold"
        @click.stop
      >
        @{{ target.user.name }}
      </KunLink>
      <span class="text-default-500 font-semibold"> #{{ target.floor }} </span>
    </div>

    <div class="text-default-700 dark:text-default-200 mt-2 text-sm">
      <KunContent
        v-if="target.replyContentHtml"
        :content="target.replyContentHtml"
        class="prose prose-sm dark:prose-invert max-w-none"
      />
      <p v-else class="line-clamp-2 italic">
        {{ target.contentPreview }}
      </p>
    </div>

    <KunLoading v-if="isLoading" description="正在获取完整评论内容..." />
  </div>
</template>
