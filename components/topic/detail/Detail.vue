<script setup lang="ts">
import type { TopicDetail } from '~/types/api/topic'
import type { TopicReply } from '~/types/api/topic-reply'

const { tempReply } = storeToRefs(useTempReplyStore())

const props = defineProps<{
  tid: number
  topic: TopicDetail
}>()

const replyData = ref<TopicReply[] | null>()
const isLoadComplete = ref(false)
const pageData = reactive({
  page: 1,
  limit: 30,
  sortOrder: 'asc' as 'asc' | 'desc'
})

const { data, pending, refresh } = await useFetch(
  `/api/topic/${props.tid}/reply`,
  {
    method: 'GET',
    query: pageData,
    watch: false,
    ...kungalgameResponseHandler
  }
)
replyData.value = data.value

const scrollPage = throttle((rid: number) => {
  let timeout: NodeJS.Timeout | null = null
  const childElement = document.querySelector(`#k${rid}`) as HTMLElement

  if (childElement) {
    childElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
    childElement.classList.add('active')

    if (timeout !== null) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      childElement.classList.remove('active')
    }, 3000)
  } else {
    useMessage(10215, 'info')
  }
}, 1000)

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

    if (pending.value) return

    await refresh()

    if (!data.value) return

    if (newValue[0] !== oldValue[0]) {
      replyData.value = replyData.value?.concat(data.value)
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
  <div class="mx-auto w-full px-4 py-8">
    <TopicDetailMaster :topic="topic" />

    <!-- Replies Section -->
    <div class="mt-8">
      <TopicDetailTool
        v-if="replyData"
        :reply-data="replyData"
        :pending="pending"
        :sort-order="pageData.sortOrder"
        @set-sort-order="(value) => (pageData.sortOrder = value)"
      />

      <div class="mt-6 space-y-6">
        <TopicReply
          v-for="reply in replyData"
          :key="reply.rid"
          :reply="reply"
          :title="topic.title"
          @scroll-page="scrollPage"
        />
      </div>

      <div v-if="replyData && replyData.length >= 30" class="mt-8 text-center">
        <button
          v-if="!pending && !isLoadComplete"
          @click="pageData.page++"
          class="bg-primary-500 hover:bg-primary-600 rounded-md px-4 py-2 text-white transition-colors"
        >
          加载更多
        </button>
        <p v-if="pending" class="text-gray-500">少女祈祷中...</p>
        <p v-if="isLoadComplete" class="text-gray-500">
          被榨干了呜呜呜呜呜, 一滴也不剩了
        </p>
      </div>
    </div>
  </div>
</template>
