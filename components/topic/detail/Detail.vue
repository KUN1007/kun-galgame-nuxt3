<script setup lang="ts">
import { useTopicReplies } from '~/composables/topic/useTopicReplies'
import type { TopicDetail } from '~/types/api/topic'

const props = defineProps<{
  topic: TopicDetail
}>()

const { id, role } = usePersistUserStore()
const { images, isLightboxOpen, currentImageIndex } = useKunLightbox()
const tempReplyStore = useTempReplyStore()
const { lastSuccessfulReply } = storeToRefs(tempReplyStore)
const isTopicAdmin = computed(() => role > 1 || props.topic.user.id === id)

const {
  replies,
  status,
  isComplete,
  sortOrder,
  loadInitialReplies,
  loadMore,
  setSort,
  addNewReply,
  updateReply,
  removeReply
} = useTopicReplies(props.topic.id)

await loadInitialReplies()

provide('topicUserId', props.topic.user.id)

watch(
  lastSuccessfulReply,
  (event) => {
    if (!event) {
      return
    }

    switch (event.type) {
      case 'created':
        addNewReply(event.data)

        nextTick(() => {
          document.getElementById(`k${event.data.floor}`)?.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          })
        })
        break
      case 'updated':
        updateReply(event.data)

        nextTick(() => {
          document.getElementById(`k${event.data.floor}`)?.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          })
        })
        break
      case 'deleted':
        removeReply(event.data.id)
        break
    }

    tempReplyStore.clearSuccessfulReply()
  },
  { deep: true }
)
</script>

<template>
  <div class="w-full min-w-0 flex-1 space-y-4">
    <KunLightbox
      :images="images"
      v-model:is-open="isLightboxOpen"
      :initial-index="currentImageIndex"
    />

    <TopicDetailMaster :topic="topic" />

    <TopicPollContainer :topic-id="topic.id" :is-topic-admin="isTopicAdmin" />

    <TopicDetailTool
      :reply-count="topic.replyCount"
      :status="status"
      :sort-order="sortOrder"
      @set-sort-order="setSort"
    />

    <section id="reply-section" class="space-y-4">
      <div
        v-if="status === 'pending' && replies.length === 0"
        class="flex justify-center py-16"
      >
        <KunLoading hint="少女祈祷中..." />
      </div>

      <TopicReplyList
        v-else-if="replies.length > 0"
        :initial-replies="replies"
        :topic-id="topic.id"
        :title="topic.title"
      />

      <div class="py-6 text-center">
        <KunButton
          v-if="!isComplete && status !== 'pending'"
          size="lg"
          variant="flat"
          @click="loadMore"
        >
          加载更多
        </KunButton>
        <KunLoading v-if="status === 'pending' && replies.length > 0" />
        <p v-if="isComplete" class="text-default-500">
          {{ `(｡>︿<｡) 已经一滴回复都不剩了哦~` }}
        </p>
      </div>
    </section>
  </div>
</template>
