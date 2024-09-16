<script setup lang="ts">
import type { SearchResult } from '~/types/api/home'

const { locale } = useI18n()
const { search, isShowSearch } = storeToRefs(useTempHomeStore())

const topics = ref<SearchResult[]>([])
const container = ref<HTMLElement>()
const isLoading = ref(false)

const typeItems = [
  {
    i18n: 'home.header.topicSearch',
    value: 'topic'
  },
  {
    i18n: 'home.header.galgameSearch',
    value: 'galgame'
  }
]

const searchTopics = async () => {
  isLoading.value = true
  const result = await $fetch('/api/home/search', {
    query: { ...search.value, language: locale.value },
    ...kungalgameResponseHandler
  })
  isLoading.value = false
  return result
}

watch(
  () => search.value.keywords,
  async () => {
    if (search.value.keywords) {
      topics.value = await searchTopics()
    } else {
      topics.value = []
      useTempHomeStore().resetSearchStatus()
    }
  }
)

watch(
  () => container.value,
  () => {
    const element = container.value
    if (element) {
      element.addEventListener('scroll', scrollHandler)
    }
  }
)

const scrollHandler = async () => {
  if (isScrollAtBottom() && search.value.isLoading && search.value.keywords) {
    search.value.page++

    const lazyLoadTopics = await searchTopics()

    if (!lazyLoadTopics.length) {
      search.value.isLoading = false
    }

    topics.value = [...topics.value, ...lazyLoadTopics]
  }
}

const isScrollAtBottom = () => {
  if (container.value) {
    const scrollHeight = container.value.scrollHeight
    const scrollTop = container.value.scrollTop
    const clientHeight = container.value.clientHeight

    const errorMargin = 1.007
    return Math.abs(scrollHeight - scrollTop - clientHeight) < errorMargin
  }
}

const onKeydown = (event: KeyboardEvent) => {
  if (event.ctrlKey && event.key.toLowerCase() === 'k') {
    event.preventDefault()
    isShowSearch.value = true
  } else if (event.key === 'Escape') {
    isShowSearch.value = false
  }
}

onMounted(() => window.addEventListener('keydown', onKeydown))

onBeforeUnmount(() => {
  const element = container.value
  if (element) {
    element.removeEventListener('scroll', scrollHandler)
  }
})

onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <KunHeader :size="2">
    <template #header>
      {{ $t('search.name') }}
    </template>
  </KunHeader>

  <div ref="container" class="container" @mousedown.stop>
    <KunNav
      :items="typeItems"
      :default-value="search.type"
      @set="(value) => (search.type = value as 'topic' | 'galgame')"
    />

    <SearchBox />

    <SearchHistory v-if="!search.keywords" />

    <SearchResult :topics="topics" v-if="topics.length" />

    <span class="empty" v-if="!topics.length && search.keywords && !isLoading">
      {{ $t('search.emptyResult') }}
    </span>

    <span class="loading" v-if="isLoading">
      {{ $t('search.loading') }}
    </span>
  </div>
  <KunFooter />
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  white-space: nowrap;
}

.kun-nav {
  margin-bottom: 17px;
}

.empty {
  display: flex;
  justify-content: center;
  color: var(--kungalgame-font-color-1);
  font-style: oblique;
  margin-top: 20px;
}

.loading {
  display: flex;
  justify-content: center;
  color: var(--kungalgame-blue-2);
  margin-top: 20px;
}

.kun-footer {
  margin-top: auto;
}

@media (max-width: 1000px) {
  .container {
    width: 60vw;
  }
}

@media (max-width: 700px) {
  .container {
    width: 90vw;
  }
}
</style>
