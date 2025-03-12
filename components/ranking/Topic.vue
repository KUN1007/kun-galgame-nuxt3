<script setup lang="ts">
import { topicIconMap } from '~/constants/ranking'
import { topicRankingPageData } from './pageData'

const { data } = await useFetch(`/api/ranking/topic`, {
  method: 'GET',
  query: topicRankingPageData,
  ...kungalgameResponseHandler
})
</script>

<template>
  <div class="rounded-lg bg-white shadow">
    <div class="divide-y divide-gray-200">
      <div
        v-for="(topic, index) in data"
        :key="topic.tid"
        class="flex items-center p-4 hover:bg-gray-50"
      >
        <span class="w-12 text-xl font-bold text-gray-400">
          {{ index + 1 }}
        </span>
        <div class="flex-1">
          <h3 class="text-lg font-medium text-gray-900">
            {{ topic.title }}
          </h3>
        </div>
        <div class="flex items-center space-x-2">
          <Icon
            :name="topicIconMap[topicRankingPageData.sortField]"
            class="h-5 w-5 text-gray-500"
          />
          <span class="font-medium">{{ topic.field }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
