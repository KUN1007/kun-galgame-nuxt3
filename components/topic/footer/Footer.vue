<script setup lang="ts">
import type { TopicDetail } from '~/types/api/topic'
import type { TopicReply } from '~/types/api/topic-reply'

const props = defineProps<{
  topic: TopicDetail
}>()

const currUserUid = usePersistUserStore().uid

const handleClickShare = () => {
  const shareLink = `${props.content.title}: https://www.kungal.com/topic/${props.info.tid}`

  navigator.clipboard
    .writeText(shareLink)
    .then(() => {
      useMessage(
        'Share Link copied successfully!',
        '分享链接复制成功',
        'success'
      )
    })
    .catch(() => {
      useMessage(
        'Share Link copy failed! Please switch to a more modern browser!',
        '分享链接复制失败! 请更换更现代的浏览器!',
        'error'
      )
    })
}
</script>

<template>
  <div class="footer">
    <div class="left">
      <TopicFooterUpvote
        :tid="topic.tid"
        :to-uid="topic.user.uid"
        :upvote-count="topic.upvotes.count"
        :is-upvoted="topic.upvotes.isUpvoted"
        v-tooltip="{
          message: { en: 'Upvote', zh: '推' },
          position: 'bottom'
        }"
      />

      <!-- Like -->
      <TopicFooterLike
        :tid="topic.tid"
        :to-uid="topic.user.uid"
        :likes-count="topic.likes.count"
        :is-liked="topic.likes.isLiked"
        v-tooltip="{
          message: { en: 'Like', zh: '点赞' },
          position: 'bottom'
        }"
      />

      <!-- Dislike -->
      <TopicFooterDislike
        :tid="topic.tid"
        :to-uid="topic.user.uid"
        :dislikes-count="topic.dislikes.count"
        :is-disliked="topic.dislikes.isDisliked"
        v-tooltip="{
          message: { en: 'Dislike', zh: '点踩' },
          position: 'bottom'
        }"
      />

      <!-- Favorite slot -->
      <slot name="favorite" />
    </div>

    <!-- Right part of the bottom (reply, comment, view only, edit) -->
    <div class="right">
      <TopicFooterReply
        :tid="topic.tid"
        :to-user-name="topic.user.name"
        :to-uid="topic.user.uid"
        :to-floor="0"
      />

      <!-- Share -->
      <span
        @click="handleClickShare"
        class="icon"
        v-tooltip="{
          message: { en: 'Share', zh: '分享' },
          position: 'bottom'
        }"
      >
        <Icon name="lucide:share-2" />
      </span>

      <!-- View Only (TODO) -->
      <!-- <span class="icon"><Icon icon="ph:user-focus-duotone" /></span> -->

      <!-- Edit -->
      <TopicFooterRewrite
        :topic="topic"
        v-tooltip="{
          message: { en: 'Rewrite', zh: 'Rewrite' },
          position: 'bottom'
        }"
      />

      <!-- Comment slot -->
      <slot name="comment" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.footer {
  padding: 7px 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left ul {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--kungalgame-font-color-3);

  li {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    margin-left: 17px;

    span {
      display: flex;
      margin-right: 3px;
    }

    &:nth-child(1) span {
      color: var(--kungalgame-red-4);
    }
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
  .reply {
    margin-right: 0;
  }
  .icon {
    font-size: initial;
  }
  .left ul {
    li {
      margin: 0;
      margin-left: 17px;
    }
  }
}
</style>
