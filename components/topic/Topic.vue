<script setup lang="ts">
import type { TopicDetail } from '~/types/api/topic'

const { isScrollToTop, scrollToReplyId, tempReply } =
  storeToRefs(useTempReplyStore())

const props = defineProps<{
  tid: number
  topic: TopicDetail
}>()

const content = ref<HTMLElement>()
const pageData = reactive({
  page: 1,
  limit: 17,
  sortOrder: 'asc'
})

const { data, pending } = await useFetch(`/api/topic/${props.tid}/reply`, {
  method: 'GET',
  query: pageData,
  ...kungalgameResponseHandler
})

watch(
  () => pending.value,
  async () => {
    if (!pending.value) {
      await nextTick()
      const replyTop = content.value?.querySelector(`#tool`) as HTMLElement
      window?.scrollTo({
        top: replyTop.offsetTop,
        behavior: 'smooth'
      })
    }
  }
)

watch(
  () => isScrollToTop.value,
  () => {
    if (content.value) {
      window?.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
      isScrollToTop.value = false
    }
  }
)

const scrollPage = (rid: number) => {
  if (!content.value) {
    return
  }

  let timeout: NodeJS.Timeout | null = null
  const childElement = content.value.querySelector(
    `#kungal-reply-${rid}`
  ) as HTMLElement

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
    useMessage(
      'This reply cannot be found temporarily. Please turn the page',
      '暂时找不到该回复，请翻页',
      'info'
    )
  }
}

watch(
  () => scrollToReplyId.value,
  async () => {
    if (scrollToReplyId.value !== -1) {
      await nextTick()
      scrollPage(scrollToReplyId.value)
      scrollToReplyId.value = -1
    }
  }
)

watch(
  () => tempReply.value[0],
  async () => {
    if (tempReply.value[0]) {
      data.value?.repliesData.push(tempReply.value[0])
      await nextTick()
      scrollPage(tempReply.value[0].floor)
      tempReply.value = []
    }
  }
)
</script>

<template>
  <div class="content" ref="content">
    <TopicMaster :topic="topic" />

    <TopicTool v-if="data" :data="data" :page-data="pageData" />

    <div v-if="data">
      <TopicReply
        v-for="reply in data.repliesData"
        :key="reply.rid"
        :reply="reply"
        :title="topic.title"
      />
    </div>

    <KunPagination
      class="pagination"
      v-if="data && data.totalCount > 7"
      :page="pageData.page"
      :limit="pageData.limit"
      :sum="data.totalCount"
      :loading="pending"
      @set-page="(newPage) => (pageData.page = newPage)"
    />
  </div>
</template>

<style lang="scss" scoped>
.pagination {
  padding: 10px;
  margin-bottom: 17px;

  @include kun-blur;
}

@media (max-width: 800px) {
  .content {
    padding: 0 5px;
  }
}
</style>
