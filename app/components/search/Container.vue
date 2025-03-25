<script setup lang="ts">
import { navItems } from './items'
import type { SearchType, SearchResult } from '@/types/api/search'

const { keywords } = storeToRefs(useTempSearchStore())

const results = ref<SearchResult[]>([])
const isLoading = ref(false)
const isLoadComplete = ref(false)
const pageData = reactive({
  type: 'topic' as SearchType,
  page: 1,
  limit: 12
})

const searchQuery = async () => {
  isLoading.value = true
  const result = await $fetch('/api/search', {
    method: 'GET',
    query: { keywords: keywords.value, ...pageData }
  })

  if (result.length < 12) {
    isLoadComplete.value = true
  }

  isLoading.value = false
  return result
}

const handleSetType = async (value: SearchType) => {
  pageData.type = value
  pageData.page = 1
  results.value = []

  if (keywords.value) {
    results.value = await searchQuery()
  } else {
    isLoading.value = false
  }
}

watch(
  () => keywords.value,
  async () => {
    pageData.page = 1

    if (keywords.value) {
      results.value = await searchQuery()
    } else {
      results.value = []
      isLoading.value = false
    }
  }
)

const handleLoadMore = async () => {
  pageData.page++
  const newData = await searchQuery()
  results.value = results.value.concat(newData)
}
</script>

<template>
  <KunCard
    :is-hoverable="false"
    :is-transparent="false"
    content-class="space-y-6"
    class-name="min-h-[calc(100dvh-6rem)]"
  >
    <KunHeader
      name="搜索"
      description="您可以在本页面搜索本论坛的所有话题, Galgame, 用户, 回复, 评论"
    />
    <KunTab
      :items="navItems"
      :model-value="pageData.type"
      @update:model-value="(value) => handleSetType(value as SearchType)"
      size="sm"
      inner-class-name="shadow border bg-transparent"
    />

    <SearchBox />

    <SearchHistory v-if="!keywords" />

    <SearchResult
      :results="results"
      :type="pageData.type"
      v-if="results.length"
    />

    <KunDivider v-if="results.length >= 12">
      <slot />
      <KunButton
        variant="flat"
        v-if="!isLoading && !isLoadComplete"
        @click="handleLoadMore"
      >
        加载更多
      </KunButton>
      <span v-if="isLoading">少女祈祷中...</span>
      <span v-if="isLoadComplete">被榨干了呜呜呜呜呜, 一滴也不剩了</span>
    </KunDivider>

    <KunNull
      v-if="!results.length && keywords && !isLoading"
      description="杂鱼杂鱼杂鱼~什么也没有搜索到"
    />

    <KunLoading v-if="isLoading" />
  </KunCard>
</template>
