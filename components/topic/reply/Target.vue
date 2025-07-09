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
  <blockquote
    @click="handleClick"
    class="group border-primary/30 bg-default-100/50 hover:border-primary/80 hover:bg-default-100 cursor-pointer rounded-lg border-l-4 p-3 transition-colors"
  >
    <div class="flex flex-wrap items-center gap-x-2 text-sm">
      <span class="text-default-600">回复</span>
      <KunLink
        underline="hover"
        size="sm"
        :to="`/user/${target.user.id}/info`"
        class-name="font-bold"
        @click.stop
      >
        @{{ target.user.name }}
      </KunLink>
      <span class="text-primary font-semibold">#{{ target.floor }}</span>
    </div>

    <p class="text-default-600 mt-1 line-clamp-2 text-sm italic">
      {{ target.contentPreview }}
    </p>

    <div v-if="isLoading" class="text-primary mt-2 text-xs">正在加载...</div>
  </blockquote>

  <KunContent :content="target.replyContentHtml" class="mt-2" />
</template>
