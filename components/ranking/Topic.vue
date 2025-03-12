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
  <div class="divide-default-200 divide-y">
    <NuxtLink
      v-for="(topic, index) in data"
      :key="topic.tid"
      :to="`/topic/${topic.tid}`"
      class="hover:bg-default-100 flex cursor-pointer items-center justify-between rounded-lg p-3 transition-colors"
    >
      <div class="flex items-center">
        <span class="w-12 text-xl font-bold text-gray-400">
          {{ index + 1 }}
        </span>
        <h3>
          {{ topic.title }}
        </h3>
      </div>

      <div class="flex items-center space-x-2">
        <Icon
          :name="topicIconMap[topicRankingPageData.sortField]"
          class="text-default-500 h-5 w-5"
        />
        <span class="font-medium">{{ topic.field }}</span>
      </div>
    </NuxtLink>
  </div>
</template>
