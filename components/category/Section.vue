<script setup lang="ts">
import { KUN_TOPIC_SECTION } from '~/constants/topic'
import type { CategoryResponseData } from '~/types/api/category'

const props = defineProps<{
  categories: CategoryResponseData[]
}>()
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="bg-background overflow-hidden rounded-lg shadow">
      <table class="divide-default-200 min-w-full divide-y">
        <thead class="bg-default-50">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase"
            >
              分区
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase"
            >
              最新话题
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase"
            >
              话题总数
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase"
            >
              浏览总数
            </th>
          </tr>
        </thead>
        <tbody class="divide-default-200 bg-background divide-y">
          <tr v-for="category in categories" :key="category.section">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-default-900 text-sm font-medium">
                {{ KUN_TOPIC_SECTION[category.section] }}
              </div>
            </td>
            <td class="px-6 py-4">
              <div class="text-default-900 text-sm">
                {{ category.topic.title }}
              </div>
              <div class="text-sm">
                {{
                  formatDate(category.topic.time, {
                    isPrecise: true,
                    isShowYear: true
                  })
                }}
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-default-900 text-sm">{{ category.topics }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-default-900 text-sm">{{ category.views }}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
