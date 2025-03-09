<script setup lang="ts">
import type { TopicReply } from '~/types/api/topic-reply'

defineProps<{
  title: string
  reply: TopicReply
}>()

const { moemoeAccessToken } = usePersistUserStore()
const { rid, toUid, toUsername, isShowPanel } = storeToRefs(
  useTempCommentStore()
)

const handleClickComment = (replyIid: number, uid: number, name: string) => {
  if (!moemoeAccessToken) {
    useMessage(10216, 'warn', 5000)
    return
  }

  rid.value = replyIid
  toUid.value = uid
  toUsername.value = name
  isShowPanel.value = !isShowPanel.value
}
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-1">
      <TopicFooterLike
        :rid="reply.rid"
        :to-uid="reply.user.uid"
        :likes-count="reply.likes.count"
        :is-liked="reply.likes.isLiked"
      />

      <TopicFooterDislike
        :rid="reply.rid"
        :to-uid="reply.user.uid"
        :dislikes-count="reply.dislikes.count"
        :is-disliked="reply.dislikes.isDisliked"
      />
    </div>

    <div class="flex items-center gap-1">
      <TopicFooterReply
        :to-user-name="reply.user.name"
        :to-uid="reply.user.uid"
        :to-floor="reply.floor"
      />

      <KunButton
        :is-icon-only="true"
        variant="light"
        color="default"
        size="lg"
        @click="
          useKunCopy(
            `${title}: https://www.kungal.com/topic/${reply.tid}#k${reply.floor}`
          )
        "
      >
        <Icon name="lucide:share-2" />
      </KunButton>

      <TopicReplyRewrite :reply="reply" />

      <KunButton
        :is-icon-only="true"
        variant="light"
        color="default"
        size="lg"
        @click="handleClickComment(reply.rid, reply.user.uid, reply.user.name)"
      >
        <Icon name="uil:comment-dots" />
      </KunButton>
    </div>
  </div>
</template>
