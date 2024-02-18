<script setup lang="ts">
import type { TopicDetail } from '~/types/api/topic'

const { isShowAdvance } = storeToRefs(usePersistKUNGalgameTopicStore())
const { isReplyRewriting } = storeToRefs(useTempReplyStore())

const {
  isEdit,
  replyRequest,
  isScrollToTop,
  isLoading,
  scrollToReplyId,
  tempReply,
} = storeToRefs(useTempReplyStore())

const { isShowCommentPanelRid } = storeToRefs(useTempCommentStore())

const props = defineProps<{
  tid: number
  topicData: TopicDetail
}>()
const tid = computed(() => props.tid)
const topicData = computed(() => props.topicData)
const content = ref<HTMLElement>()
const isExecuteScrollToReplyAnimate = ref(false)
const contentScrollHeight = ref(0)

useTempReplyStore().resetPageStatus()

const getReplies = async () => {
  const data = await useFetch(`/api/topic/${tid.value}/reply`, {
    method: 'GET',
    query: {
      page: replyRequest.value.page,
      limit: replyRequest.value.limit,
      sortField: replyRequest.value.sortField,
      sortOrder: replyRequest.value.sortOrder,
    },
    watch: false,
    ...kungalgameResponseHandler,
  })
  return data
}

const { data: repliesData } = await getReplies()
if (repliesData.value && repliesData.value.length < 3) {
  isLoading.value = false
}

watch(
  () => [replyRequest.value.sortOrder, replyRequest.value.sortField],
  async () => {
    if (repliesData.value && repliesData.value?.length < 3) {
      isLoading.value = false
      return
    }
    const newReplies = await getReplies()
    repliesData.value = newReplies.data.value
  }
)

watch(
  () => tempReply.value.rid,
  async () => {
    if (!repliesData.value) {
      return
    }
    repliesData.value = [...repliesData.value, tempReply.value]

    await new Promise((resolve) => {
      setTimeout(resolve, 107)
    })

    scrollToReplyId.value = tempReply.value.floor
    if (repliesData.value.length === tempReply.value.floor) {
      isLoading.value = false
    }
  }
)

watch(isScrollToTop, () => {
  if (content.value) {
    content.value.scrollTo({
      top: 0,
    })
    isScrollToTop.value = false
  }
})

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

const handelScroll = async () => {
  if (!repliesData.value) {
    return
  }

  if (isScrollAtBottom() && isLoading.value) {
    replyRequest.value.page++

    const { data } = await getReplies()
    const lazyLoadReplies = data.value ? data.value : []

    if (!lazyLoadReplies.length) {
      isLoading.value = false
      return
    }

    repliesData.value = [...repliesData.value, ...lazyLoadReplies]
  }
}

const isScrollAtBottom = () => {
  if (content.value) {
    const scrollHeight = content.value.scrollHeight
    const scrollTop = content.value.scrollTop
    const clientHeight = content.value.clientHeight

    contentScrollHeight.value = scrollTop

    const errorMargin = 1.007
    return Math.abs(scrollHeight - scrollTop - clientHeight) < errorMargin
  }
}

const resetPanelStatus = () => {
  isShowCommentPanelRid.value = 0
  isEdit.value = false
  isShowAdvance.value = false
}

onBeforeRouteLeave(async (to, from, next) => {
  if (isReplyRewriting.value) {
    const res = await useTempMessageStore().alert('AlertInfo.edit.leave', true)
    if (res) {
      useTempReplyStore().resetRewriteReplyData()
      resetPanelStatus()
      next()
    } else {
      next(false)
    }
  } else {
    next()
  }
  isEdit.value = false
  isShowAdvance.value = false
})

onBeforeMount(() => {
  resetPanelStatus()
})
</script>

<template>
  <div class="content-container">
    <TopicAside
      class="aside"
      v-if="topicData?.tags && topicData.user"
      :tags="topicData.tags"
      :uid="topicData.user.uid"
    />

    <div class="content" ref="content" @scroll="handelScroll">
      <Transition
        enter-active-class="animate__animated animate__fadeInDown animate__faster"
      >
        <div class="title-scroll" v-if="contentScrollHeight > 400">
          {{ topicData?.title }}
        </div>
      </Transition>

      <TopicMaster v-if="topicData" :topicData="topicData" />

      <TopicReply
        v-if="topicData && repliesData"
        :repliesData="repliesData"
        :title="topicData.title"
        :isExecuteScrollToReplyAnimate="isExecuteScrollToReplyAnimate"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content-container {
  width: 100%;
  max-width: 64rem;
  transition: width 0.2s;
  height: calc(100vh - 75px);
  min-height: 500px;
  margin: 0 auto;
  display: flex;
}

.content {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  border-radius: 10px;
  box-shadow: var(--kungalgame-shadow-0);
  background-color: var(--kungalgame-trans-white-5);
  backdrop-filter: blur(10px);
  scrollbar-width: thin;
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
  background-color: var(--kungalgame-trans-white-5);
  border: 1px solid var(--kungalgame-blue-5);
  border-radius: 10px;
  backdrop-filter: blur(17px);
  z-index: 1;
}

@media (max-width: 700px) {
  .content-container {
    width: 95%;
  }

  .aside {
    display: none;
  }
}
</style>
