<script setup lang="ts">
import { KUN_TOPIC_CATEGORY, KUN_TOPIC_SECTION } from '~/constants/topic'
import { KUN_CATEGORY_DESCRIPTION_MAP } from '~/constants/category'
import type { CategoryResponseData } from '~/types/api/category'

defineProps<{
  categories: CategoryResponseData[]
  categoryName: string
}>()
</script>

<template>
  <KunCard :is-hoverable="false" :is-transparent="false">
    <KunHeader
      :is-show-divider="false"
      :name="KUN_TOPIC_CATEGORY[categoryName]"
      :description="KUN_CATEGORY_DESCRIPTION_MAP[categoryName]"
    />
  </KunCard>

  <div class="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
    <KunCard
      :is-transparent="false"
      :is-pressable="true"
      v-for="category in categories"
      :key="category.section"
      :href="`/section/${category.section}`"
    >
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-lg font-semibold">
          {{ KUN_TOPIC_SECTION[category.section] }}
        </h2>
        <div class="flex items-center gap-4 text-sm text-gray-500">
          <div class="flex items-center gap-2 text-inherit">
            <Icon name="lucide:newspaper" />
            {{ formatNumber(category.topics) }}
          </div>
          <div class="flex items-center gap-2 text-inherit">
            <Icon name="lucide:eye" />
            {{ formatNumber(category.views) }}
          </div>
        </div>
      </div>

      <div class="space-y-2">
        <h3 class="line-clamp-1">
          {{ category.topic.title }}
        </h3>
        <p class="text-default-500 text-sm">
          {{ formatTimeDifference(category.topic.time) }}
        </p>
      </div>
    </KunCard>
  </div>
</template>
