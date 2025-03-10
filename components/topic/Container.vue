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
  <div class="flex flex-col gap-3 rounded-lg">
    <TopicTool />

    <TopicLayout :topics="topics" />

    <div class="w-full items-center justify-center p-6">
      <KunButton size="lg" v-if="!isLoadingComplete" @click="handleLoadTopics">
        点击继续加载话题
      </KunButton>

      <p v-if="isLoadingComplete" class="text-default-500">
        已经。。。一滴也不剩了
      </p>
    </div>

    <KunFooter />
  </div>
</template>
