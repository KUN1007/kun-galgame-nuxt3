<script setup lang="ts">
import { scrollPage } from '../_helper'
import type { TopicReply } from '~/types/api/topic-reply'

const { scrollToReplyId } = storeToRefs(useTempReplyStore())
const { replyId: storeReplyId, isShowPanel } = storeToRefs(
  useTempCommentStore()
)

const props = defineProps<{
  reply: TopicReply
  title: string
  isLoadingTarget: number | null
}>()

const emit = defineEmits<{
  loadReply: [targetReplyId: number, anchorReplyId: number]
}>()

const handleLoadDetail = (targetReplyId: number) => {
  emit('loadReply', targetReplyId, props.reply.id)
}

const comments = ref(props.reply.comment)

watch(
  () => scrollToReplyId.value,
  async () => {
    if (scrollToReplyId.value !== -1) {
      await nextTick()
      scrollPage(scrollToReplyId.value)
      scrollToReplyId.value = -1
    }
  }
)

const replyContent = computed(() => {
  const targetsContent = props.reply.targets.map((t) => t.replyContentMarkdown)
  const content = props.reply.contentMarkdown + targetsContent.join('')
  return markdownToText(content.slice(0, 20))
})
</script>

<template>
  <div
    class="outline-primary kun-reply flex justify-between gap-3 outline-offset-2"
    :id="`${reply.floor}.${replyContent}`"
  >
    <KunCard
      :is-transparent="false"
      :is-hoverable="false"
      class-name="w-full"
      content-class="gap-3"
    >
      <TopicDetailUser
        :user="reply.user"
        :created="reply.created"
        :edited="reply.edited"
        :topic-id="reply.topicId"
        :floor="reply.floor"
      />

      <div
        v-if="reply.targets && reply.targets.length > 0"
        class="flex flex-col gap-2"
      >
        <TopicReplyTarget
          v-for="target in reply.targets"
          :key="target.id"
          :target="target"
          :is-loading="isLoadingTarget === target.id"
          @load-detail="handleLoadDetail"
        />
      </div>

      <KunContent
        v-if="reply.contentMarkdown && reply.contentMarkdown.trim()"
        :content="reply.contentHtml"
      />

      <div class="flex items-center justify-between space-x-2 text-sm">
        <div class="text-default-500">
          <span>
            {{
              formatDate(reply.created, { isShowYear: true, isPrecise: true })
            }}
          </span>
          <span v-if="reply.edited" class="ml-2">
            (已编辑于
            {{
              formatDate(reply.edited, { isShowYear: true, isPrecise: true })
            }})
          </span>
        </div>
        <KunLink
          color="default"
          underline="none"
          :to="`/topic/${reply.topicId}#k${reply.floor}`"
          class-name="text-default-400 font-bold"
        >
          #{{ reply.floor }}
        </KunLink>
      </div>

      <TopicReplyFooter :reply="reply" :title="title" />

      <TopicComment :reply-id="reply.id" :comments-data="comments" />

      <KunAnimationFadeCard>
        <LazyTopicCommentPanel
          v-if="isShowPanel && reply.id === storeReplyId"
          :reply-id="reply.id"
          @get-comment="(newComment) => comments.push(newComment)"
        />
      </KunAnimationFadeCard>
    </KunCard>
  </div>
</template>
