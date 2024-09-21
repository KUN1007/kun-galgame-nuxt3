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
  <div class="footer">
    <div class="left">
      <TopicFooterUpvote
        :rid="reply.rid"
        :to-uid="reply.user.uid"
        :upvote-count="reply.upvotes.count"
        :is-upvoted="reply.upvotes.isUpvoted"
        v-tooltip="{
          message: {
            'en-us': 'Upvote',
            'ja-jp': '推す',
            'zh-cn': '推',
            'zh-tw': '推'
          },
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
          message: {
            'en-us': 'Like',
            'ja-jp': 'いいね',
            'zh-cn': '点赞',
            'zh-tw': '點贊'
          },
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
          message: {
            'en-us': 'Dislike',
            'ja-jp': '低評価',
            'zh-cn': '点踩',
            'zh-tw': '點踩'
          },
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
          useKunCopy(
            `${title}: https://www.kungal.com/topic/${reply.tid}#k${reply.floor}`
          )
        "
        class="icon"
        v-tooltip="{
          message: {
            'en-us': 'Share',
            'ja-jp': '共有',
            'zh-cn': '分享',
            'zh-tw': '分享'
          },
          position: 'bottom'
        }"
      >
        <Icon name="lucide:share-2" />
      </span>

      <TopicReplyRewrite
        :reply="reply"
        v-tooltip="{
          message: 'Rewrite',
          position: 'bottom'
        }"
      />

      <span
        @click="handleClickComment(reply.rid, reply.user.uid, reply.user.name)"
        class="comment"
        v-tooltip="{
          message: {
            'en-us': 'Comment',
            'ja-jp': 'コメント',
            'zh-cn': '评论',
            'zh-tw': '評論'
          },
          position: 'bottom'
        }"
      >
        <Icon name="uil:comment-dots" />
      </span>
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

    &:last-child {
      margin-right: 0;
    }
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
