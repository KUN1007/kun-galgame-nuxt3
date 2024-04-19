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
  <div ref="content">
    <TopicMaster :topic="topic" />

    <div class="tool" v-if="data && data.totalCount > 5" id="tool">
      <div class="page">
        <button @click="pageData.page--" :disabled="pageData.page === 1">
          <Icon name="lucide:chevron-left" />
        </button>
        <span>
          {{ `${pageData.page} / ${Math.ceil(data.totalCount / 17)}` }}
        </span>
        <button
          @click="pageData.page++"
          :disabled="pageData.page === Math.ceil(data.totalCount / 17)"
        >
          <Icon name="lucide:chevron-right" />
        </button>
      </div>

      <div class="order">
        <span
          :class="pageData.sortOrder === 'asc' ? 'active' : ''"
          @click="pageData.sortOrder = 'asc'"
        >
          <Icon name="lucide:arrow-up" />
        </span>
        <span
          :class="pageData.sortOrder === 'desc' ? 'active' : ''"
          @click="pageData.sortOrder = 'desc'"
        >
          <Icon name="lucide:arrow-down" />
        </span>
      </div>
    </div>

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
.content {
  height: 100%;
  margin: 0 auto;
}

.tool {
  padding: 10px;
  color: var(--kungalgame-font-color-3);
  box-shadow: var(--kungalgame-shadow-0);
  background-color: var(--kungalgame-trans-white-5);
  border-radius: 10px;
  backdrop-filter: blur(10px);
  margin-bottom: 17px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .page {
    font-size: large;
    user-select: none;

    button {
      padding: 5px 10px;
      border-radius: 10px;
      margin: 0 7px;
      border: none;
      background-color: transparent;
      font-size: medium;
      color: var(--kungalgame-font-color-3);

      &:hover {
        background-color: var(--kungalgame-trans-blue-1);
      }

      &:disabled {
        &:hover {
          cursor: not-allowed;
          background-color: transparent;
        }
      }
    }
  }

  .order {
    display: flex;
    white-space: nowrap;

    span {
      cursor: pointer;
      padding: 3px 10px;
      margin-right: 5px;
      border-radius: 10px;
    }

    .icon {
      font-size: 20px;
    }

    .active {
      box-shadow: var(--kungalgame-shadow-0);
    }
  }
}

.pagination {
  padding: 10px;
  color: var(--kungalgame-font-color-3);
  box-shadow: var(--kungalgame-shadow-0);
  background-color: var(--kungalgame-trans-white-5);
  border-radius: 10px;
  backdrop-filter: blur(10px);
  margin-bottom: 17px;
}

@media (max-width: 800px) {
  .content-container {
    width: 95%;
  }
}
</style>
