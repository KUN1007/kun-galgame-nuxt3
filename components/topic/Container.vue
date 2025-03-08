<script setup lang="ts">
import { pageData } from './pageData'
import type { TopicCard } from '~/types/api/topic'

const isLoadingComplete = ref(false)
const topics = ref<TopicCard[]>([])
const savedPosition = ref(0)

const getTopics = async () => {
  const result = await $fetch(`/api/topic`, {
    method: 'GET',
    query: pageData,
    watch: false,
    ...kungalgameResponseHandler
  })
  return result
}

if (!topics.value.length) {
  topics.value = await getTopics()
}

const isFetching = ref(false)
const scrollHandler = async () => {
  if (isScrollAtBottom() && !isLoadingComplete.value && !isFetching.value) {
    isFetching.value = true
    pageData.page++
    const newData = await getTopics()

    if (newData.length < pageData.limit) {
      isLoadingComplete.value = true
    }

    topics.value = topics.value.concat(newData)
    isFetching.value = false
  }
}

const isScrollAtBottom = () => {
  const scrollHeight = document.documentElement.scrollHeight
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  const clientHeight = document.documentElement.clientHeight
  savedPosition.value = scrollTop

  const errorMargin = 500
  return Math.abs(scrollHeight - scrollTop - clientHeight) < errorMargin
}

watch(
  () => [pageData.sortField, pageData.sortOrder, pageData.category],
  async () => {
    pageData.page = 1
    isLoadingComplete.value = false
    topics.value = []
    pageData.page = 1
    savedPosition.value = 0
    topics.value = await getTopics()
  }
)

const handleLoadTopics = async () => {
  if (isLoadingComplete.value) {
    return
  }
  pageData.page++
  const lazyLoadTopics = await getTopics()

  if (lazyLoadTopics.length < 24) {
    isLoadingComplete.value = true
  }
  topics.value = topics.value.concat(lazyLoadTopics)
}

onMounted(() => {
  window.scrollTo({
    top: savedPosition.value
  })
  window.addEventListener('scroll', scrollHandler)
})

onUnmounted(() => {
  window.removeEventListener('scroll', scrollHandler)
})
</script>

<template>
  <div class="bg-background flex flex-col rounded-lg">
    <TopicTool />

    <TopicLayout :topics="topics" />

    <div class="load">
      <span class="loader" v-if="!isLoadingComplete" @click="handleLoadTopics">
        点击继续加载话题
      </span>

      <span class="complete" v-else-if="isLoadingComplete">
        已经。。。一滴也不剩了
      </span>
    </div>

    <KunFooter />
  </div>
</template>

<style lang="scss" scoped>
.load {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  margin: 24px 0;

  .loader {
    cursor: pointer;
    color: var(--kungalgame-font-color-1);

    &:hover {
      color: var(--kungalgame-blue-5);
    }
  }

  .complete {
    color: var(--kungalgame-trans-blue-2);
    user-select: none;
    cursor: default;
  }
}

.kun-footer {
  margin-bottom: 17px;
}
</style>
