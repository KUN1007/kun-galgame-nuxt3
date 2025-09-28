<script setup lang="ts">
import type { TopicDetail } from '~/types/api/topic'

defineProps<{
  topic: TopicDetail
}>()

const { id } = usePersistUserStore()
</script>

<template>
  <div class="mt-auto flex items-center justify-between">
    <div class="flex items-center gap-1">
      <TopicFooterUpvote
        :topic-id="topic.id"
        :target-user-id="topic.user.id"
        :upvote-count="topic.upvoteCount"
        :is-upvoted="topic.isUpvoted"
      />

      <TopicFooterLike
        :topic-id="topic.id"
        :target-user-id="topic.user.id"
        :like-count="topic.likeCount"
        :is-liked="topic.isLiked"
      />

      <TopicFooterDislike
        :topic-id="topic.id"
        :target-user-id="topic.user.id"
        :dislike-count="topic.dislikeCount"
        :is-disliked="topic.isDisliked"
      />

      <TopicFooterFavorite
        :topic-id="topic.id"
        :target-user-id="topic.user.id"
        :favorite-count="topic.favoriteCount"
        :is-favorite="topic.isFavorited"
      />
    </div>

    <div class="flex items-center gap-1">
      <TopicFooterReply
        :target-user-name="topic.user.name"
        :target-user-id="topic.user.id"
        :target-floor="0"
      />

      <KunTooltip text="分享">
        <KunButton
          :is-icon-only="true"
          variant="light"
          color="default"
          size="lg"
          @click="
            useKunCopy(
              `${topic.title}: https://www.kungal.com/topic/${topic.id}`
            )
          "
        >
          <KunIcon name="lucide:share-2" />
        </KunButton>
      </KunTooltip>

      <TopicFooterRewrite :topic="topic" />

      <KunPopover position="top-end">
        <template v-if="id" #trigger>
          <KunButton
            :is-icon-only="true"
            variant="light"
            color="default"
            size="lg"
          >
            <KunIcon name="lucide:ellipsis" />
          </KunButton>
        </template>

        <div class="flex w-54 flex-col gap-2 p-2">
          <TopicFooterHide :topic-id="topic.id" />
        </div>
      </KunPopover>
    </div>
  </div>
</template>
