<script setup lang="ts">
import type { SearchResult } from '~/types/api/search'

const { keywords } = storeToRefs(useTempSearchStore())

const results = ref<SearchResult[]>([])
const container = ref<HTMLElement>()
const isLoading = ref(false)
const pageData = reactive({
  type: 'galgame',
  page: '1',
  limit: '10'
})

const typeItems = [
  {
    i18n: 'search.topic',
    value: 'topic'
  },
  {
    i18n: 'search.galgame',
    value: 'galgame'
  }
]

const searchQuery = async () => {
  isLoading.value = true
  const result = await $fetch('/api/search', {
    method: 'GET',
    query: pageData,
    ...kungalgameResponseHandler
  })
  isLoading.value = false
  return result
}

watch(
  () => keywords.value,
  async () => {
    if (keywords.value) {
      results.value = await searchQuery()
    } else {
      results.value = []
      isLoading.value = false
    }
  }
)
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
      :default-value="pageData.type"
      @set="(value) => (pageData.type = value)"
    />

    <SearchBox />

    <SearchHistory v-if="!keywords" />

    <SearchResult :topics="results" v-if="results.length" />

    <span class="empty" v-if="!results.length && keywords && !isLoading">
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
