<script setup lang="ts">
import type { TopicReply } from '~/types/api/topic-reply'

defineProps<{
  title: string
  reply: TopicReply
}>()

const { replyId, targetUserId, targetUsername, isShowPanel } = storeToRefs(
  useTempCommentStore()
)

const handleClickComment = (id: number, uid: number, name: string) => {
  if (!uid) {
    useMessage(10216, 'warn', 5000)
    return
  }

  replyId.value = id
  targetUserId.value = uid
  targetUsername.value = name
  isShowPanel.value = !isShowPanel.value
}
</script>

<template>
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
          @click="handleClickComment(reply.id, reply.user.id, reply.user.name)"
        >
          <KunIcon name="uil:comment-dots" />
        </KunButton>
      </KunTooltip>
    </div>
  </div>
</template>
