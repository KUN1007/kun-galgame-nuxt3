<script setup lang="ts">
import type { TopicReply } from '~/types/api/topic-reply'

defineProps<{
  title: string
  reply: TopicReply
}>()
</script>

<template>
  <div class="footer">
    <div class="left">
      <TopicFooterUpvote
        :rid="reply.rid"
        :to-uid="reply.user.uid"
        :upvote-count="reply.upvotes.count"
        :is-upvoted="reply.upvotes.isUpvoted"
        v-tooltip="{
          message: { en: 'Upvote', zh: '推' },
          position: 'bottom'
        }"
      />

      <!-- Like -->
      <TopicFooterLike
        :rid="reply.rid"
        :to-uid="reply.user.uid"
        :likes-count="reply.likes.count"
        :is-liked="reply.likes.isLiked"
        v-tooltip="{
          message: { en: 'Like', zh: '点赞' },
          position: 'bottom'
        }"
      />

      <!-- Dislike -->
      <TopicFooterDislike
        :rid="reply.rid"
        :to-uid="reply.user.uid"
        :dislikes-count="reply.dislikes.count"
        :is-disliked="reply.dislikes.isDisliked"
        v-tooltip="{
          message: { en: 'Dislike', zh: '点踩' },
          position: 'bottom'
        }"
      />
    </div>

    <div class="right">
      <TopicFooterReply
        :to-user-name="reply.user.name"
        :to-uid="reply.user.uid"
        :to-floor="reply.floor"
      />

      <span
        @click="
          useKunCopy(`${title}: https://www.kungal.com/topic/${reply.tid}`)
        "
        class="icon"
        v-tooltip="{
          message: { en: 'Share', zh: '分享' },
          position: 'bottom'
        }"
      >
        <Icon name="lucide:share-2" />
      </span>

      <TopicReplyRewrite
        :reply="reply"
        v-tooltip="{
          message: { en: 'Rewrite', zh: 'Rewrite' },
          position: 'bottom'
        }"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.footer {
  padding: 17px 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left {
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--kungalgame-font-color-3);

  span {
    display: flex;
    margin-right: 17px;
  }
}

.views {
  margin-left: 17px;
}

.icon {
  font-size: 24px;
  color: var(--kungalgame-font-color-2);
  cursor: pointer;
}

.right {
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    display: flex;
    margin-right: 17px;
  }
}

.active {
  color: var(--kungalgame-blue-5);
}

@media (max-width: 700px) {
  .icon {
    font-size: initial;
  }
}
</style>
