<script setup lang="ts">
import { userIconMap } from '~/constants/ranking'
import { userRankingPageData } from './pageData'

const { data } = await useFetch(`/api/ranking/user`, {
  method: 'GET',
  query: userRankingPageData,
  ...kungalgameResponseHandler
})
</script>

<template>
  <div class="divide-y divide-gray-200">
    <div
      v-for="(user, index) in data"
      :key="user.uid"
      class="flex items-center p-4 hover:bg-gray-50"
    >
      <span class="w-12 text-xl font-bold text-gray-400">{{ index + 1 }}</span>
      <div class="flex flex-1 items-center">
        <img
          :src="user.avatar"
          class="mr-4 h-10 w-10 rounded-full"
          :alt="user.name"
        />
        <h3 class="text-lg font-medium text-gray-900">{{ user.name }}</h3>
      </div>
      <div class="flex items-center space-x-2">
        <Icon
          :name="userIconMap[userRankingPageData.sortField]"
          class="h-5 w-5 text-gray-500"
        />
        <span class="font-medium">{{ user.field }}</span>
      </div>
    </div>
  </div>
</template>
