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

const { savedPosition, pageData, topics } = storeToRefs(useTempPoolStore())
const isLoadingComplete = ref(false)

const getTopics = async () => {
  const result = await $fetch(`/api/pool/topic`, {
    method: 'GET',
    query: pageData.value,
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
    pageData.value.page++
    const newData = await getTopics()

    if (newData.length < pageData.value.limit) {
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
  () => [
    pageData.value.sortField,
    pageData.value.sortOrder,
    pageData.value.category
  ],
  async () => {
    pageData.value.page = 1
    isLoadingComplete.value = false
    useTempPoolStore().resetPageStatus()
    topics.value = await getTopics()
  }
)

const handleLoadTopics = async () => {
  if (isLoadingComplete.value) {
    return
  }
  pageData.value.page++
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
    <div class="tool" v-if="topics">
      <div class="sort">
        <KunSelect
          :styles="{ width: '100px' }"
          :options="['created', 'views']"
          :default-value="pageData.sortField"
          i18n="pool"
          @set="(value) => (pageData.sortField = value as 'views' | 'created')"
          position="bottom"
        >
          <span>{{ $t(`pool.${pageData.sortField}`) }}</span>
        </KunSelect>

        <KunSelect
          :styles="{ width: '150px' }"
          :options="['all', 'galgame', 'technique', 'others']"
          :default-value="pageData.category"
          i18n="pool"
          @set="
            (value) =>
              (pageData.category = value as
                | 'all'
                | 'galgame'
                | 'technique'
                | 'others')
          "
          position="bottom"
        >
          <span>{{ $t(`pool.${pageData.category}`) }}</span>
        </KunSelect>

        <PoolSimpleMode />
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
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  max-width: 64rem;
  min-height: calc(100dvh - 75px);
  margin: 0 auto;
  padding: 0 10px;
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

  .sort {
    display: flex;
  }

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
  padding: 10px;
  @include kun-blur;
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
    color: var(--kungalgame-font-color-1);
    margin-bottom: 17px;
  }
}

.kun-footer {
  margin-bottom: 17px;
}

@media (max-width: 700px) {
  .pool {
    min-height: calc(100dvh - 63px);
    padding: 0 5px;
  }

  .container {
    grid-template-columns: repeat(2, minmax(100px, 233px));
    padding: 10px 0;
  }

  .tool {
    margin-bottom: 7px;
  }
}
</style>
