<script setup lang="ts">
import { navItems } from './items'
import type { SearchType, SearchResult } from '~/types/api/search'

const { keywords } = storeToRefs(useTempSearchStore())

const results = ref<SearchResult[]>([])
const isLoading = ref(false)
const isLoadComplete = ref(false)
const pageData = reactive({
  type: 'topic' as SearchType,
  page: 1,
  limit: 10
})

const searchQuery = async () => {
  isLoading.value = true
  const result = await $fetch('/api/search', {
    method: 'GET',
    query: { keywords: keywords.value, ...pageData }
  })

  if (result.length < 10) {
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
  <KunHeader :size="2">
    <template #header>搜索</template>
  </KunHeader>

  <div class="container">
    <div class="nav">
      <KunTab
        :items="navItems"
        :default-value="pageData.type"
        @set="(value) => handleSetType(value as SearchType)"
      />
    </div>

    <SearchBox />

    <SearchHistory v-if="!keywords" />

    <SearchResult
      :results="results"
      :type="pageData.type"
      v-if="results.length"
    />

    <KunDivider v-if="results.length >= 10" margin="30px" padding="0 17px">
      <slot />
      <span
        class="loader"
        v-if="!isLoading && !isLoadComplete"
        @click="handleLoadMore"
      >
        加载更多
      </span>
      <span v-if="isLoading">少女祈祷中...</span>
      <span v-if="isLoadComplete">被榨干了呜呜呜呜呜, 一滴也不剩了</span>
    </KunDivider>

    <span class="empty" v-if="!results.length && keywords && !isLoading">
      杂鱼杂鱼杂鱼~什么也没有搜索到
    </span>

    <span class="loading" v-if="isLoading">少女祈祷中...</span>
  </div>
  <KunFooter />
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.kun-divider {
  font-size: 16px;

  span {
    &:first-child {
      padding-left: 17px;
    }

    &:last-child {
      padding-right: 17px;
    }
  }

  .loader {
    cursor: pointer;

    &:hover {
      color: var(--kungalgame-blue-5);
    }
  }
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
