<script setup lang="ts">
import { topicSortItem } from '~/constants/ranking'
import { topicRankingPageData, getRankClasses } from './pageData'

const { data } = await useFetch(`/api/ranking/topic`, {
  method: 'GET',
  query: topicRankingPageData,
  ...kungalgameResponseHandler
})
</script>

<template>
  <ul v-if="data" class="space-y-3">
    <li v-for="(topic, index) in data" :key="topic.id">
      <KunLink
        color="default"
        underline="none"
        :to="`/topic/${topic.id}`"
        :class-name="
          cn(
            'relative flex items-center gap-3 rounded-xl border p-3 transition-all hover: hover:-translate-y-1',
            getRankClasses(index)
          )
        "
      >
        <RankingMedal :index="index" />

        <div class="flex-1">
          <h3 class="truncate font-semibold">{{ topic.title }}</h3>
          <div class="mt-1 flex items-center gap-2">
            <KunAvatar :user="topic.user" size="sm" />
            <span class="text-default-500 text-sm">{{ topic.user.name }}</span>

            <div class="flex shrink-0 items-center gap-2 sm:hidden">
              <KunIcon
                :name="
                  topicSortItem.find((i) => i.sortField === topic.sortField)
                    ?.icon || ''
                "
                class="text-primary h-5 w-5"
              />
              <span class="text-default-500 text-sm">
                {{ topic.value }}
              </span>
            </div>
          </div>
        </div>

        <div class="hidden shrink-0 items-center gap-2 sm:flex">
          <KunIcon
            :name="
              topicSortItem.find((i) => i.sortField === topic.sortField)
                ?.icon || ''
            "
            class="text-primary h-5 w-5"
          />
          <span class="text-lg font-medium">{{ topic.value }}</span>
        </div>
      </KunLink>
    </li>
  </ul>
</template>
