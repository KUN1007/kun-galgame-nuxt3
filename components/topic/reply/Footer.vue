<script setup lang="ts">
import type { TopicReply } from '~/types/api/topic-reply'
import type { TopicComment } from '~/types/api/topic-comment'

defineProps<{
  title: string
  reply: TopicReply
}>()

const emits = defineEmits<{
  handleNewComment: [comment: TopicComment]
}>()

const { id } = usePersistUserStore()
const isCommentPanelVisible = ref(false)

const handleClickComment = () => {
  if (!id) {
    useMessage(10216, 'warn', 5000)
    return
  }
  isCommentPanelVisible.value = !isCommentPanelVisible.value
}

const handleNewComment = (comment: TopicComment) => {
  emits('handleNewComment', comment)
  isCommentPanelVisible.value = false
}
</script>

<template>
  <div class="w-full">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-1">
        <TopicFooterLike
          :reply-id="reply.id"
          :target-user-id="reply.user.id"
          :like-count="reply.likeCount"
          :is-liked="reply.isLiked"
        />

        <TopicFooterDislike
          :reply-id="reply.id"
          :target-user-id="reply.user.id"
          :dislike-count="reply.dislikeCount"
          :is-disliked="reply.isDisliked"
        />
      </div>

      <div class="flex items-center gap-1">
        <TopicFooterReply
          :target-user-name="reply.user.name"
          :target-user-id="reply.user.id"
          :target-floor="reply.floor"
          :target-reply-id="reply.id"
        />
        <KunTooltip text="分享该回复">
          <KunButton
            :is-icon-only="true"
            variant="light"
            color="default"
            size="lg"
            @click="
              useKunCopy(
                `${title}: https://www.kungal.com/topic/${reply.topicId}#k${reply.floor}`
              )
            "
          >
            <KunIcon name="lucide:share-2" />
          </KunButton>
        </KunTooltip>
        <TopicReplyRewrite :reply="reply" />
        <KunTooltip text="评论">
          <KunButton
            :is-icon-only="true"
            variant="light"
            color="default"
            size="lg"
            @click="handleClickComment"
          >
            <KunIcon name="uil:comment-dots" />
          </KunButton>
        </KunTooltip>
        <!-- ... 更多按钮 ... -->
        <KunPopover position="top-end">
          <template v-if="id" #trigger>
            <KunButton
              :is-icon-only="true"
              variant="light"
              color="default"
              size="lg"
            >
              <KunIcon name="lucide:ellipsis" />
            </KunButton>
          </template>

          <div class="flex w-54 flex-col gap-2 p-2">
            <TopicReplyPin :reply="reply" />
            <TopicReplyBestAnswer :reply="reply" />
            <TopicReplyDelete :reply="reply" />
          </div>
        </KunPopover>
      </div>
    </div>

    <KunAnimationFadeCard>
      <LazyTopicCommentPanel
        v-if="isCommentPanelVisible"
        class="mt-4"
        :reply-id="reply.id"
        :target-user="reply.user"
        @get-comment="handleNewComment"
        @close-panel="isCommentPanelVisible = false"
      />
    </KunAnimationFadeCard>
  </div>
</template>
