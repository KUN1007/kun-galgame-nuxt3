<script setup lang="ts">
import { scrollPage } from '../_helper'
import type { TopicDetail } from '~/types/api/topic'
import type { TopicReply } from '~/types/api/topic-reply'

const { images, isLightboxOpen, currentImageIndex } = useKunLightbox()

const { tempReply } = storeToRefs(useTempReplyStore())

const props = defineProps<{
  topic: TopicDetail
}>()

const replyData = ref<TopicReply[] | null>()
const isLoadComplete = ref(false)
const topicTocRef = useTemplateRef('toc')
const pageData = reactive({
  page: 1,
  limit: 30,
  sortOrder: 'asc' as 'asc' | 'desc'
})

const { data, status, refresh } = await useFetch(
  `/api/topic/${props.topic.tid}/reply`,
  {
    method: 'GET',
    query: pageData,
    watch: false,
    ...kungalgameResponseHandler
  }
)
replyData.value = data.value

watch(
  () => tempReply.value[0],
  async () => {
    if (tempReply.value[0]) {
      replyData.value?.push(tempReply.value[0])
      await nextTick()
      scrollPage(tempReply.value[0].floor)
      tempReply.value = []
    }
  }
)

watch(
  () => [pageData.page, pageData.sortOrder],
  async (newValue, oldValue) => {
    if (newValue[1] !== oldValue[1]) {
      pageData.page = 1
      isLoadComplete.value = false
    }

    if (status.value === 'pending') return

    await refresh()

    if (!data.value) return

    if (newValue[0] !== oldValue[0]) {
      replyData.value = replyData.value?.concat(data.value)
      nextTick(() => topicTocRef.value?.refreshTOC())
    } else if (newValue[1] !== oldValue[1]) {
      replyData.value = data.value
    }

    if (data.value.length < 30) {
      isLoadComplete.value = true
    }
  }
)
</script>

<template>
  <div class="flex w-full">
    <KunLightbox
      :images="images"
      v-model:is-open="isLightboxOpen"
      :initial-index="currentImageIndex"
    />

    <div class="w-full space-y-3 lg:w-[calc(100%-208px)]">
      <TopicDetailMaster :topic="topic" />

      <TopicDetailTool
        v-if="replyData"
        :reply-data="replyData"
        :loading="status === 'pending'"
        :sort-order="pageData.sortOrder"
        @set-sort-order="(value) => (pageData.sortOrder = value)"
      />

      <TopicReply
        v-for="reply in replyData"
        :key="reply.rid"
        :reply="reply"
        :title="topic.title"
      />
    </div>

    <div class-name="w-52 shrink-0">
      <div class="fixed ml-3 hidden w-full lg:block">
        <TopicDetailTableOfContent ref="toc" />
      </div>
    </div>
  </div>

  <div v-if="replyData && replyData.length >= 30" class="py-6 text-center">
    <KunButton
      size="lg"
      v-if="status !== 'pending' && !isLoadComplete"
      @click="pageData.page++"
    >
      加载更多
    </KunButton>
    <p v-if="status === 'pending'" class="text-default-500">少女祈祷中...</p>
    <p v-if="isLoadComplete" class="text-default-500">
      被榨干了呜呜呜呜呜, 一滴也不剩了
    </p>
  </div>
</template>
