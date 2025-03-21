<script setup lang="ts">
const { data: articles } = await useAsyncData('all-articles', () =>
  queryCollection('content').all()
)
const expandedCategories = ref<Record<string, boolean>>({})

const categorizedArticles = computed(() => {
  if (!articles.value) return {}

  return articles.value.reduce(
    (acc: Record<string, unknown[]>, article: any) => {
      const category = article.category || '未分类'
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(article)
      return acc
    },
    {}
  )
})

const toggleCategory = (category: string) => {
  expandedCategories.value[category] = !expandedCategories.value[category]
}
</script>

<template>
  <div class="hidden shrink-0 space-y-8 lg:block lg:w-64">
    <h3 class="mb-4 text-lg font-semibold">文章目录</h3>
    <div
      v-for="(articles, category) in categorizedArticles"
      :key="category"
      class="mb-4"
    >
      <button
        @click="toggleCategory(category)"
        class="flex w-full items-center justify-between rounded px-1 py-2 text-left hover:bg-gray-50"
      >
        <span class="font-medium text-gray-700"
          >{{ category || 'Uncategorized' }}
        </span>
        <svg
          class="h-5 w-5 transform transition-transform"
          :class="{ 'rotate-90': expandedCategories[category] }"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      <div v-show="expandedCategories[category]" class="mt-2 ml-4 space-y-2">
        <NuxtLink
          v-for="article in articles"
          :key="article.path"
          :to="article.path"
          class="block rounded px-2 py-1 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
        >
          {{ article.title }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
