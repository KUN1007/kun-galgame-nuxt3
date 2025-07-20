<script setup lang="ts">
import type { TopicComment } from '~/types/api/topic-comment'

const props = defineProps<{
  replyId: number
  commentsData: TopicComment[]
}>()

const comments = ref(props.commentsData)

const currentUserUid = usePersistUserStore().id
const {
  replyId: storeReplyId,
  targetUserId,
  targetUsername,
  isShowPanel
} = storeToRefs(useTempCommentStore())

const handleClickComment = (comment: TopicComment) => {
  if (!currentUserUid) {
    useMessage(10216, 'warn', 5000)
    return
  }

  storeReplyId.value = props.replyId
  targetUserId.value = comment.user.id
  targetUsername.value = comment.user.name
  isShowPanel.value = !isShowPanel.value
}

const handleRemoveComment = (commentId: number) => {
  const index = comments.value.findIndex((c) => c.id === commentId)
  if (index !== -1) {
    comments.value.splice(index, 1)
  }
}
</script>

<template>
  <div v-if="comments.length" class="bg-default-100 space-y-3 rounded-lg p-3">
    <h3 class="text-lg font-semibold">评论</h3>

    <div class="space-y-3">
      <div
        v-for="(comment, index) in comments"
        :key="index"
        class="flex items-start space-x-3"
      >
        <KunAvatar :user="comment.user" />

        <div class="flex w-full flex-col space-y-1">
          <div class="flex items-center justify-between">
            <div class="text-sm">
              <span>{{ comment.user.name }}</span>
              <span class="text-default-500 mx-1">评论</span>
              <KunLink
                underline="hover"
                :to="`/user/${comment.targetUser.id}/info`"
              >
                {{ comment.targetUser.name }}
              </KunLink>
            </div>

            <div class="flex items-center gap-1">
              <TopicCommentLike :comment="comment" />
              <KunButton
                :is-icon-only="true"
                variant="light"
                color="default"
                class-name="gap-1"
                @click="handleClickComment(comment)"
              >
                <KunIcon name="uil:comment-dots" />
              </KunButton>

              <TopicCommentDelete
                @remove-comment="handleRemoveComment"
                :comment="comment"
              />
            </div>
          </div>

          <p class="text-default-700 text-sm whitespace-pre-wrap">
            {{ comment.content }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
