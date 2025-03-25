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
  <div class="divide-default-200 divide-y">
    <KunLink
      color="default"
      underline="none"
      v-for="(user, index) in data"
      :key="user.uid"
      :to="`/user/${user.uid}/info`"
      class-name="hover:bg-default-100 flex cursor-pointer items-center justify-between rounded-lg p-3 transition-colors"
    >
      <div class="flex items-center">
        <span class="text-default-500 w-12 text-xl font-bold">
          {{ index + 1 }}
        </span>
        <KunAvatar :user="user" />
        <h3 class="ml-3">{{ user.name }}</h3>
      </div>

      <div class="flex items-center space-x-2">
        <Icon
          :name="userIconMap[userRankingPageData.sortField]"
          class="text-primary h-5 w-5"
        />
        <span class="font-medium">{{ user.field }}</span>
      </div>
    </KunLink>
  </div>
</template>
