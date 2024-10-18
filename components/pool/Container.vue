<script setup lang="ts">
import type { PoolTopic } from '~/types/api/pool'
import { pageData } from './pageData'

const isLoadingComplete = ref(false)
const topics = ref<PoolTopic[]>([])
const savedPosition = ref(0)

const getTopics = async () => {
  const result = await $fetch(`/api/pool/topic`, {
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
  <div class="pool" ref="pool">
    <PoolTool />

    <PoolLayout :topics="topics" />

    <div class="load">
      <span class="loader" v-if="!isLoadingComplete" @click="handleLoadTopics">
        {{ $t('pool.load') }}
      </span>

      <span class="complete" v-else-if="isLoadingComplete">
        {{ $t('pool.complete') }}
      </span>
    </div>

    <KunFooter />
  </div>
</template>

<style lang="scss" scoped>
.pool {
  display: flex;
  flex-direction: column;
  max-width: 64rem;
  margin: 0 auto;
  padding: 0 10px;
}

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

@media (max-width: 700px) {
  .pool {
    padding: 0 5px;
  }
}
</style>
