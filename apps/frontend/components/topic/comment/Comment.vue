<script setup lang="ts">
import type { TopicComment } from '~/types/api/topic-comment'

const props = defineProps<{
  rid: number
  commentsData: TopicComment[]
}>()

const currentUserUid = usePersistUserStore().uid
const {
  rid: storeRid,
  toUid,
  toUsername,
  isShowPanel
} = storeToRefs(useTempCommentStore())

const handleClickComment = (comment: TopicComment) => {
  if (!currentUserUid) {
    useMessage(10216, 'warn', 5000)
    return
  }

  storeRid.value = props.rid
  toUid.value = comment.user.uid
  toUsername.value = comment.user.name
  isShowPanel.value = !isShowPanel.value
}
</script>

<template>
  <div
    v-if="commentsData?.length"
    class="bg-default-100 space-y-3 rounded-lg p-3"
  >
    <h3 class="text-lg font-semibold">评论</h3>

    <div class="space-y-3">
      <div
        v-for="(comment, index) in commentsData"
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
                :to="`/user/${comment.toUser.uid}/info`"
              >
                {{ comment.toUser.name }}
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
