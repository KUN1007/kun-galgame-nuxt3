<script setup lang="ts">
import type { TopicDetail } from '~/types/api/topic'

const { isScrollToTop, scrollToReplyId } = storeToRefs(useTempReplyStore())

const props = defineProps<{
  tid: number
  topic: TopicDetail
}>()
const content = ref<HTMLElement>()
const isExecuteScrollToReplyAnimate = ref(false)
const scrollHeight = ref(0)

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
      scrollHeight.value = 0
      window?.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
      isScrollToTop.value = false
    }
  }
)

watch(
  () => scrollToReplyId.value,
  async () => {
    if (content.value && scrollToReplyId.value !== -1) {
      const childElement = content.value.querySelector(
        `#kungalgame-reply-${scrollToReplyId.value}`
      ) as HTMLElement

      if (childElement) {
        childElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
        childElement.classList.add('active')

        await new Promise((resolve) => {
          setTimeout(resolve, 3000)
        })

        childElement.classList.remove('active')
      } else {
        useMessage(
          'This reply cannot be found temporarily. Please turn the page',
          '暂时找不到该回复，请翻页',
          'info'
        )
      }
      scrollToReplyId.value = -1
    }
  }
)
</script>

<template>
  <div ref="content">
    <Transition
      enter-active-class="animate__animated animate__fadeInDown animate__faster"
    >
      <div class="title-scroll" v-if="scrollHeight > 400">
        {{ topic.title }}
      </div>
    </Transition>

    <TopicMaster :topic-data="topic" />

    <div class="tool" id="tool">
      <div class="page" v-if="data">
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
          {{ $t('galgame.asc') }}
        </span>
        <span
          :class="pageData.sortOrder === 'desc' ? 'active' : ''"
          @click="pageData.sortOrder = 'desc'"
        >
          {{ $t('galgame.desc') }}
        </span>
      </div>
    </div>

    <div
      v-if="data"
      :title="topic.title"
      :is-execute-scroll-to-reply-animate="isExecuteScrollToReplyAnimate"
    >
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
      border: 2px solid transparent;
      border-radius: 10px;
    }

    .active {
      border: 2px solid var(--kungalgame-blue-5);
      background-color: var(--kungalgame-trans-blue-0);
    }
  }
}

.title-scroll {
  position: sticky;
  top: 0;
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 17px;
  font-weight: bold;
  color: var(--kungalgame-font-color-3);
  background-color: var(--kungalgame-trans-white-2);
  border: 1px solid var(--kungalgame-blue-5);
  border-radius: 10px;
  z-index: 1;
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
