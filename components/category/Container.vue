<script setup lang="ts">
import { KUN_TOPIC_SECTION } from '~/constants/topic'
import type { CategoryResponseData } from '~/types/api/category'

defineProps<{
  categories: CategoryResponseData[]
}>()
</script>

<template>
  <div class="mx-auto max-w-7xl">
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <KunCard
        :is-transparent="false"
        :is-pressable="true"
        v-for="category in categories"
        :key="category.section"
        :href="`/section/${category.section}`"
      >
        <div class="mb-4 flex items-center justify-between">
          <h3 class="text-lg font-semibold">
            {{ KUN_TOPIC_SECTION[category.section] }}
          </h3>
          <div class="flex items-center space-x-4 text-sm text-gray-500">
            <div class="flex items-center">
              <Icon name="lucide:newspaper" />
              {{ category.topics }}
            </div>
            <div class="flex items-center">
              <Icon name="lucide:eye" />
              {{ category.views }}
            </div>
          </div>
        </div>

        <div class="space-y-2">
          <h4 class="line-clamp-1 text-base font-medium text-gray-800">
            {{ category.topic.title }}
          </h4>
          <p class="text-sm text-gray-500">
            {{ formatTimeDifference(category.topic.time) }}
          </p>
        </div>
      </KunCard>
    </div>
  </div>
</template>
