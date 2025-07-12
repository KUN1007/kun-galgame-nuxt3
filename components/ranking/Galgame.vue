<script setup lang="ts">
import { galgameSortItem } from '~/constants/ranking'
import { galgameRankingPageData } from './pageData'

const { data } = await useFetch(`/api/ranking/galgame`, {
  method: 'GET',
  query: galgameRankingPageData,
  ...kungalgameResponseHandler
})
</script>

<template>
  <KunLink
    color="default"
    underline="none"
    v-for="(galgame, index) in data"
    :key="galgame.id"
    :to="`/user/${galgame.id}/info`"
    class-name="hover:bg-default-100 flex cursor-pointer items-center justify-between rounded-lg p-3 transition-colors"
  >
    <div class="flex items-center">
      <span class="text-default-500 w-12 text-xl font-bold">
        {{ index + 1 }}
      </span>
      {{ getPreferredLanguageText(galgame.name) }}
    </div>

    <div class="flex items-center space-x-2">
      <KunIcon
        :name="
          galgameSortItem.find((i) => i.sortField === galgame.sortField)
            ?.icon || ''
        "
        class="text-primary h-5 w-5"
      />
      <span class="font-medium">{{ galgame.value }}</span>
    </div>
  </KunLink>
</template>
