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

const replyRequest = reactive({
  page: 1,
  limit: '3',
  sortField: 'floor',
  sortOrder: 'asc'
})

const { data: repliesData } = await useFetch(`/api/topic/${props.tid}/reply`, {
  method: 'GET',
  query: replyRequest,
  ...kungalgameResponseHandler
})

watch(
  () => isScrollToTop.value,
  () => {
    if (content.value) {
      scrollHeight.value = 0
      content.value.scrollTo({
        top: 0
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
          'Unable to find the specified reply for now. Please scroll down.',
          '暂时找不到指定回复，请下滑',
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

    <TopicReply
      v-if="repliesData"
      :replies-data="repliesData"
      :title="topic.title"
      :is-execute-scroll-to-reply-animate="isExecuteScrollToReplyAnimate"
    />
  </div>
</template>

<style lang="scss" scoped>
.content {
  height: 100%;
  margin: 0 auto;
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

@media (max-width: 800px) {
  .content-container {
    width: 95%;
  }
}
</style>
