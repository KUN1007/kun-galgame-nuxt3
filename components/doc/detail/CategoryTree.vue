<script setup lang="ts">
import { KUN_DOC_CATEGORY_MAP } from '~/constants/doc'
import type { ContentCollectionItem } from '@nuxt/content'

const route = useRoute()

const { data: posts } = await useAsyncData(() => {
  return queryCollection('content').all()
})

const expandedCategories = ref<Record<string, boolean>>({})

const categorizedArticles = computed(() => {
  if (!posts.value) {
    return {}
  }

  return posts.value.reduce(
    (
      acc: Record<string, ContentCollectionItem[]>,
      article: ContentCollectionItem
    ) => {
      const category = article.category

      if (!acc[category]) {
        acc[category] = []
        expandedCategories.value[category] = true
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
  <div class="fixed hidden shrink-0 space-y-1 lg:w-64 xl:block">
    <h3 class="p-3 text-xl font-semibold">文章目录</h3>
    <div class="scrollbar-hide max-h-[calc(100dvh-10rem)] overflow-y-auto">
      <div
        class="space-y-1"
        v-for="(articles, category) in categorizedArticles"
        :key="category"
      >
        <KunButton
          :full-width="true"
          variant="light"
          size="lg"
          @click="toggleCategory(category)"
          class-name="justify-between mb-2"
        >
          <span class="text-foreground">
            {{ KUN_DOC_CATEGORY_MAP[category] }}
          </span>
          <KunIcon
            :name="
              expandedCategories[category]
                ? 'lucide:chevron-down'
                : 'lucide:chevron-right'
            "
          />
        </KunButton>

        <div v-if="expandedCategories[category]" class="ml-4 space-y-1">
          <KunButton
            :full-width="true"
            :variant="route.fullPath === article.path ? 'flat' : 'light'"
            v-for="article in articles"
            :key="article.path"
            :href="article.path"
            class-name="justify-start text-start"
          >
            <span
              :class="
                cn(
                  'gap-2',
                  route.fullPath === article.path ? '' : 'text-foreground'
                )
              "
            >
              {{ article.title }}
            </span>
          </KunButton>
        </div>
      </div>
    </div>
  </div>
</template>
