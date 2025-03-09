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
      />

      <TopicFooterLike
        :tid="topic.tid"
        :to-uid="topic.user.uid"
        :likes-count="topic.likes.count"
        :is-liked="topic.likes.isLiked"
      />

      <TopicFooterDislike
        :tid="topic.tid"
        :to-uid="topic.user.uid"
        :dislikes-count="topic.dislikes.count"
        :is-disliked="topic.dislikes.isDisliked"
      />

      <TopicFooterFavorite
        :tid="topic.tid"
        :to-uid="topic.user.uid"
        :favorites-count="topic.favorites.count"
        :is-favorite="topic.favorites.isFavorite"
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
            `${topic.title}: https://www.kungal.com/topic/${topic.tid}`
          )
        "
        class="icon"
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
