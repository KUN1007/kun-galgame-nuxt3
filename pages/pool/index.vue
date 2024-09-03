<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: `${t('seo.pool.title')} - ${t('head.title')}`,
  meta: [
    {
      name: 'description',
      content: t('seo.pool.description')
    }
  ]
})

const pool = ref<HTMLElement>()
const { savedPosition, page, topics } = storeToRefs(useTempPoolStore())
const isLoadingComplete = ref(false)

const iconMap: Record<string, string> = {
  views: 'lucide:mouse-pointer-click',
  created: 'lucide:calendar-heart'
}

const pageData = reactive({
  limit: 12,
  sortField: 'created',
  sortOrder: 'desc'
})

const getTopics = async () => {
  const result = await $fetch(`/api/pool/topic`, {
    method: 'GET',
    query: { page: page.value, ...pageData },
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
    page.value++
    const newData = await getTopics()

    if (newData.length < pageData.limit) {
      isLoadingComplete.value = true
    }

    topics.value = topics.value.concat(newData)
    isFetching.value = false
  }
}

const isScrollAtBottom = () => {
  if (pool.value) {
    const scrollHeight = pool.value.scrollHeight
    const scrollTop = pool.value.scrollTop
    const clientHeight = pool.value.clientHeight

    savedPosition.value = scrollTop

    const errorMargin = 300
    return Math.abs(scrollHeight - scrollTop - clientHeight) < errorMargin
  }
}

watch(
  () => [pageData.sortField, pageData.sortOrder],
  async () => {
    page.value = 1
    isLoadingComplete.value = false

    pool.value?.scrollTo({
      top: 0
    })

    useTempPoolStore().resetPageStatus()
    topics.value = await getTopics()
  }
)

const handleLoadTopics = async () => {
  if (isLoadingComplete.value) {
    return
  }
  page.value++
  const lazyLoadTopics = await getTopics()

  if (lazyLoadTopics.length < 12) {
    isLoadingComplete.value = true
  }
  topics.value = topics.value.concat(lazyLoadTopics)
}

onMounted(() => {
  pool.value?.scrollTo({
    top: savedPosition.value,
    left: 0
  })
})
</script>

<template>
  <div class="pool" ref="pool" @scroll="scrollHandler">
    <div class="tool" v-if="topics" id="tool">
      <KunSelect
        :styles="{ width: '150px' }"
        :options="['views', 'created']"
        :default-value="pageData.sortField"
        i18n="pool"
        @set="(value) => (pageData.sortField = value)"
        position="bottom"
      >
        <Icon :name="iconMap[pageData.sortField]" />
        <span>{{ $t(`pool.${pageData.sortField}`) }}</span>
      </KunSelect>

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

    <div class="container">
      <PoolTopic
        v-for="(kun, index) in topics"
        :key="index"
        class="item"
        :topic="kun"
      />

      <KunSkeletonPoolTopics v-if="topics && !topics.length" />
    </div>

    <div class="load">
      <KunButton v-if="!isLoadingComplete" @click="handleLoadTopics">
        {{ $t('pool.load') }}
      </KunButton>

      <span v-else-if="isLoadingComplete">
        {{ $t('pool.complete') }}
      </span>
    </div>

    <KunFooter />
  </div>
</template>

<style lang="scss" scoped>
.pool {
  height: calc(100dvh - 75px);
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  max-width: calc(64rem + 10px);
  margin: 0 auto;
  padding: 0 10px;

  &::-webkit-scrollbar {
    width: 7px;
  }
}

.tool {
  position: sticky;
  top: 0;
  padding: 10px;
  color: var(--kungalgame-font-color-3);
  box-shadow: var(--shadow);
  background-color: var(--kungalgame-trans-white-5);
  border-radius: 10px;
  margin-bottom: 17px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 17;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    border-radius: 10px;
    backdrop-filter: blur(var(--kun-background-blur));
    will-change: transform;
  }

  .icon {
    font-size: 20px;
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

    .active {
      box-shadow: var(--shadow);
      color: var(--kungalgame-blue-5);
    }
  }
}

.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
}

.load {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;

  .kun-button {
    margin-bottom: 17px;
    font-size: medium;
  }

  span {
    font-size: 20px;
    cursor: pointer;
    color: var(--kungalgame-blue-5);
    border-bottom: 2px solid transparent;

    &:hover {
      border-bottom: 2px solid var(--kungalgame-blue-5);
    }
  }
}

@media (max-width: 700px) {
  .pool {
    height: calc(100dvh - 65px);
  }

  .container {
    grid-template-columns: repeat(2, minmax(100px, 233px));
    gap: 7px;
  }
}
</style>
