<script setup lang="ts">
import type { TopicDetail } from '~/types/api/topic'

defineProps<{
  topic: TopicDetail
}>()
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
          message: {
            'en-us': 'Upvote',
            'ja-jp': '推す',
            'zh-cn': '推',
            'zh-tw': '推'
          },
          position: 'bottom'
        }"
      />

      <TopicFooterLike
        :tid="topic.tid"
        :to-uid="topic.user.uid"
        :likes-count="topic.likes.count"
        :is-liked="topic.likes.isLiked"
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

      <TopicFooterDislike
        :tid="topic.tid"
        :to-uid="topic.user.uid"
        :dislikes-count="topic.dislikes.count"
        :is-disliked="topic.dislikes.isDisliked"
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

      <TopicFooterFavorite
        :tid="topic.tid"
        :to-uid="topic.user.uid"
        :favorites-count="topic.favorites.count"
        :is-favorite="topic.favorites.isFavorite"
        v-tooltip="{
          message: {
            'en-us': 'Favorite',
            'ja-jp': 'お気に入り',
            'zh-cn': '收藏',
            'zh-tw': '收藏'
          },
          position: 'bottom'
        }"
      />
    </div>

    <div class="right">
      <TopicFooterReply
        :tid="topic.tid"
        :to-user-name="topic.user.name"
        :to-uid="topic.user.uid"
        :to-floor="0"
      />

      <span
        @click="
          useKunCopy(
            `${topic.title}: https://www.kungal.com/${locale}/topic/${topic.tid}`
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
        <Icon class="icon" name="lucide:share-2" />
      </span>

      <TopicFooterRewrite
        :topic="topic"
        v-tooltip="{
          message: 'Rewrite',
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
