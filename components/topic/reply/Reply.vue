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

const cardClasses = computed(() => {
  if (props.reply.isBestAnswer) {
    return 'border-l-4 border-success-600 dark:border-success-700'
  }
  if (props.reply.isPinned) {
    return 'border-l-4 border-secondary-500 dark:border-secondary-600'
  }
  return ''
})

const bannerBaseClasses =
  'flex items-center gap-2 px-4 py-2 mb-3 rounded-lg font-semibold text-sm'
</script>

<template>
  <div
    class="outline-primary kun-reply flex justify-between gap-3 outline-offset-2"
    :id="`${reply.floor}.${replyContent}`"
  >
    <KunCard
      :is-transparent="false"
      :is-hoverable="false"
      :class-name="cn('w-full relative', cardClasses)"
      content-class="gap-3"
    >
      <div
        v-if="reply.isBestAnswer"
        :class="
          cn(
            'bg-success-500/20 text-success-700 dark:text-success-300',
            bannerBaseClasses
          )
        "
      >
        <KunIcon class-name="text-xl" name="lucide:bookmark-check" />
        <span>最佳答案</span>
        <KunIcon
          class-name="absolute bottom-3 right-3 text-[10rem] text-success-500/20 select-none -z-1"
          name="lucide:circle-check-big"
        />
      </div>

      <div
        v-else-if="reply.isPinned"
        :class="
          cn(
            'bg-secondary-500/20 text-secondary-700 dark:text-secondary-300',
            bannerBaseClasses
          )
        "
      >
        <KunIcon class-name="text-xl" name="lucide:pin" />
        <span>置顶回复</span>
        <KunIcon
          class-name="absolute bottom-3 right-3 text-[10rem] text-success-500/20 select-none -z-1"
          name="lucide:disc-2"
        />
      </div>

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
