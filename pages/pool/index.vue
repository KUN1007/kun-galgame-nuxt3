<script setup lang="ts">
const pool = ref<HTMLElement>()

const { page, limit, sortField, sortOrder, isScrollToTop } =
  storeToRefs(useTempPoolStore())
const { showKUNGalgamePageWidth } = storeToRefs(useKUNGalgameSettingsStore())
const isLoadingComplete = ref(false)

useTempPoolStore().resetPageStatus()

const poolPageWidth = computed(() => {
  return showKUNGalgamePageWidth.value.pool + '%'
})

const getTopics = async () => {
  const data = await useFetch(`/api/pool/topic`, {
    method: 'GET',
    query: { page, limit, sortField, sortOrder },
    watch: false,
    onResponse({ request, response, options }) {
      if (response.status === 233) {
        kungalgameErrorHandler(response.statusText)
        return
      }
    },
  })
  return data
}
const { data: topics } = await getTopics()
if (!topics.value || topics.value.length < 10) {
  isLoadingComplete.value = true
}

watch(
  () => [sortField.value, sortOrder.value],
  async () => {
    isLoadingComplete.value = false
    useTempPoolStore().resetPageStatus()

    const newTopics = await getTopics()
    topics.value = newTopics.data.value
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
  const { data } = await getTopics()
  const lazyLoadTopics = data.value ? data.value : []

  if (lazyLoadTopics.length < 10) {
    isLoadingComplete.value = true
    return
  }
  topics.value = [...topics.value, ...lazyLoadTopics]
}
</script>

<template>
  <div class="pool" ref="pool">
    <div class="pool-container">
      <div class="topic-container">
        <PoolTopic
          v-if="topics && topics.length"
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
  height: calc(100vh - 65px);
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
}

.pool-container {
  transition: width 0.2s;
  width: v-bind(poolPageWidth);
  margin: 0 auto;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  backdrop-filter: blur(5px);
  background-color: var(--kungalgame-trans-white-5);
  border-radius: 5px;
  padding: 5px;
}

.topic-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-auto-rows: minmax(100px, 320px);
  gap: 10px;
}

.load {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;

  span {
    font-size: 20px;
    cursor: pointer;
    color: var(--kungalgame-blue-4);
    border-bottom: 2px solid var(--kungalgame-trans-white-9);

    &:hover {
      border-bottom: 2px solid var(--kungalgame-blue-4);
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
