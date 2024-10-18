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
const { layout } = storeToRefs(usePersistPoolStore())
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
      </div>

      <div class="func">
        <span
          :class="layout === 'grid' ? 'active' : ''"
          @click="layout = 'grid'"
        >
          <Icon class="icon" name="lucide:layout-grid" />
        </span>
        <span
          :class="layout === 'list' ? 'active' : ''"
          @click="layout = 'list'"
        >
          <Icon class="icon" name="lucide:list" />
        </span>
        <span
          :class="pageData.sortOrder === 'asc' ? 'active' : ''"
          @click="pageData.sortOrder = 'asc'"
        >
          <Icon class="icon" name="lucide:arrow-up" />
        </span>
        <span
          :class="pageData.sortOrder === 'desc' ? 'active' : ''"
          @click="pageData.sortOrder = 'desc'"
        >
          <Icon class="icon" name="lucide:arrow-down" />
        </span>
      </div>
    </div>

    <PoolLayout :topics="topics" />

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
  margin: 0 auto;
  padding: 0 10px;
}

.tool {
  padding: 10px;
  color: var(--kungalgame-font-color-3);
  box-shadow: var(--shadow);
  background-color: var(--kungalgame-trans-white-5);
  border-radius: 10px;
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  z-index: 17;

  .sort {
    display: flex;
  }

  .icon {
    font-size: 20px;
  }

  .func {
    display: flex;
    white-space: nowrap;

    & > span {
      display: flex;
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
    padding: 0 5px;
  }

  .tool {
    .sort {
      margin-bottom: 8px;
    }

    .icon {
      font-size: 16px;
    }
  }
}
</style>
