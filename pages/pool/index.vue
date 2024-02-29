<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: t('seo.pool.title'),
  meta: [
    {
      name: 'description',
      content: t('seo.pool.description'),
    },
  ],
})

const pool = ref<HTMLElement>()

const {
  page,
  limit,
  sortField,
  sortOrder,
  isScrollToTop,
  savedPosition,
  topics,
} = storeToRefs(useTempPoolStore())
const isLoadingComplete = ref(false)

const getTopics = async () => {
  const { data } = await useFetch(`/api/pool/topic`, {
    method: 'GET',
    query: { page, limit, sortField, sortOrder },
    watch: false,
    ...kungalgameResponseHandler,
  })
  return data.value ?? []
}

if (!topics.value.length) {
  topics.value = await getTopics()
}

const scrollHandler = async () => {
  if (isScrollAtBottom() && !isLoadingComplete.value) {
    page.value++

    const newData = await getTopics()

    if (newData.length < 10) {
      isLoadingComplete.value = true
    }

    topics.value = topics.value.concat(newData)
  }
}

const isScrollAtBottom = () => {
  if (pool.value) {
    const scrollHeight = pool.value.scrollHeight
    const scrollTop = pool.value.scrollTop
    const clientHeight = pool.value.clientHeight

    savedPosition.value = scrollTop

    const errorMargin = 1.007
    return Math.abs(scrollHeight - scrollTop - clientHeight) < errorMargin
  }
}

watch(
  () => [sortField.value, sortOrder.value],
  async () => {
    isLoadingComplete.value = false

    pool.value?.scrollTo({
      top: 0,
    })

    useTempPoolStore().resetPageStatus()

    topics.value = await getTopics()
  }
)

watch(
  () => isScrollToTop.value,
  () => {
    if (pool.value) {
      pool.value.scrollTo({
        top: 0,
      })
      isScrollToTop.value = false
    }
  }
)

const handleLoadTopics = async () => {
  if (!topics.value || isLoadingComplete.value) {
    return
  }

  page.value++
  const lazyLoadTopics = await getTopics()

  if (lazyLoadTopics.length < 10) {
    isLoadingComplete.value = true
  }
  topics.value = topics.value.concat(lazyLoadTopics)
}

onMounted(() => {
  pool.value?.scrollTo({
    top: savedPosition.value,
    left: 0,
  })

  const element = pool.value
  if (element) {
    element.addEventListener('scroll', scrollHandler)
  }
})

onBeforeUnmount(() => {
  const element = pool.value
  if (element) {
    element.removeEventListener('scroll', scrollHandler)
  }
})
</script>

<template>
  <div class="pool" ref="pool">
    <div class="pool-container">
      <div class="topic-container">
        <PoolTopic
          v-for="(kun, index) in topics"
          :key="index"
          class="item"
          :topic="kun"
        />

        <KunSkeletonPoolTopics v-if="topics && !topics.length" />
      </div>

      <div class="load">
        <span v-if="!isLoadingComplete" @click="handleLoadTopics">
          {{ $t('pool.load') }}
        </span>

        <span v-else-if="isLoadingComplete">
          {{ $t('pool.complete') }}
        </span>
      </div>

      <KunFooter />
    </div>

    <PoolBar />
  </div>
</template>

<style lang="scss" scoped>
.pool {
  height: calc(100dvh - 75px);
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
}

.pool-container {
  transition: width 0.2s;
  width: 100%;
  max-width: 64rem;
  margin: 0 auto;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
}

.topic-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-auto-rows: minmax(100px, 320px);
  gap: 17px;
}

.load {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;

  span {
    font-size: 20px;
    cursor: pointer;
    color: var(--kungalgame-blue-5);
    border-bottom: 2px solid var(--kungalgame-trans-white-9);

    &:hover {
      border-bottom: 2px solid var(--kungalgame-blue-5);
    }
  }
}

@media (max-width: 700px) {
  .pool-container {
    width: 100%;
  }

  .topic-container {
    grid-template-columns: repeat(2, minmax(100px, 222px));
    grid-auto-rows: minmax(100px, 300px);
  }
}
</style>
