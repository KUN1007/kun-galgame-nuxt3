<script setup lang="ts">
import type { TopicDetail } from '~/types/api/topic'

defineProps<{
  topic: TopicDetail
}>()
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-1">
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

    <div class="flex items-center gap-1">
      <TopicFooterReply
        :tid="topic.tid"
        :to-user-name="topic.user.name"
        :to-uid="topic.user.uid"
        :to-floor="0"
      />

      <KunTooltip text="分享">
        <KunButton
          :is-icon-only="true"
          variant="light"
          color="default"
          size="lg"
          @click="
            useKunCopy(
              `${topic.title}: https://www.kungal.com/topic/${topic.tid}`
            )
          "
        >
          <Icon name="lucide:share-2" />
        </KunButton>
      </KunTooltip>

      <TopicFooterRewrite :topic="topic" />
    </div>
  </div>
</template>
