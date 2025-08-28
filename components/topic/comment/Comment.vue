<script setup lang="ts">
import type { TopicComment } from '~/types/api/topic-comment'

const props = defineProps<{
  replyId: number
  commentsData: TopicComment[]
}>()

const currentUserUid = usePersistUserStore().id
const comments = ref(props.commentsData)
const activeCommentId = ref<number | null>(null)
const targetUserForPanel = ref<KunUser | null>(null)

const handleClickComment = (comment: TopicComment) => {
  if (!currentUserUid) {
    useMessage(10216, 'warn', 5000)
    return
  }

  if (activeCommentId.value === comment.id) {
    activeCommentId.value = null
    targetUserForPanel.value = null
  } else {
    activeCommentId.value = comment.id
    targetUserForPanel.value = comment.user
  }
}

const handleNewComment = (newComment: TopicComment) => {
  comments.value.push(newComment)
  activeCommentId.value = null
  targetUserForPanel.value = null
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
      <div v-for="comment in comments" :key="comment.id">
        <div class="flex items-start space-x-3">
          <KunAvatar :user="comment.user" />

          <div class="flex w-full flex-col space-y-1">
            <div class="flex items-center justify-between">
              <div class="text-sm">
                <span>{{ comment.user.name }}</span>
                <span class="text-default-500 mx-1">评论</span>
                <KunLink
                  size="sm"
                  underline="hover"
                  :to="`/user/${comment.targetUser.id}/info`"
                >
                  {{ comment.targetUser.name }}
                </KunLink>
              </div>

              <div class="flex items-center gap-1">
                <TopicCommentDelete
                  @remove-comment="handleRemoveComment"
                  :comment="comment"
                />
              </div>
            </div>

            <p
              style="overflow-wrap: break-word"
              class="text-default-700 text-sm whitespace-pre-wrap"
            >
              {{ comment.content }}
            </p>

            <div class="flex items-center justify-between">
              <span class="text-default-500 text-xs">
                {{
                  formatDate(comment.created, {
                    isPrecise: true,
                    isShowYear: true
                  })
                }}
              </span>

              <div class="flex gap-2">
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
              </div>
            </div>
          </div>
        </div>

        <KunAnimationFadeCard>
          <LazyTopicCommentPanel
            v-if="activeCommentId === comment.id && targetUserForPanel"
            :reply-id="replyId"
            :target-user="targetUserForPanel"
            @get-comment="handleNewComment"
            @close-panel="activeCommentId = null"
          />
        </KunAnimationFadeCard>
      </div>
    </div>
  </div>
</template>
