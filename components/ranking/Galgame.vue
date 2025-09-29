<script setup lang="ts">
import { galgameSortItem } from '~/constants/ranking'
import { galgameRankingPageData, getRankClasses } from './pageData'

const { data } = await useFetch(`/api/ranking/galgame`, {
  method: 'GET',
  query: galgameRankingPageData,
  ...kungalgameResponseHandler
})
</script>

<template>
  <ul v-if="data" class="space-y-3">
    <li v-for="(galgame, index) in data" :key="galgame.id">
      <KunLink
        color="default"
        underline="none"
        :to="`/galgame/${galgame.id}`"
        :class-name="
          cn(
            'relative flex border border-default/20 items-center gap-3 rounded-xl p-3 transition-all hover:-translate-y-1',
            getRankClasses(index)
          )
        "
      >
        <RankingMedal :index="index" />

        <div
          class="aspect-video h-16 shrink-0 overflow-hidden rounded-md bg-cover bg-center"
          :style="{
            backgroundImage: `url(${galgame.banner.replace(/\.webp$/, '-mini.webp')})`
          }"
        />
        <div class="flex-1">
          <div class="flex flex-col items-start justify-between gap-3">
            <h2 class="font-semibold">
              {{ getPreferredLanguageText(galgame.name) }}
            </h2>
            <div class="mt-1 flex items-center gap-2">
              <KunAvatar :user="galgame.user" size="sm" />
              <span class="text-default-500 text-sm">
                {{ galgame.user.name }}
              </span>

              <div class="flex shrink-0 items-center gap-2 sm:hidden">
                <KunIcon
                  :name="
                    galgameSortItem.find(
                      (i) => i.sortField === galgame.sortField
                    )?.icon || ''
                  "
                  class="text-primary"
                />
                <span class="text-default-500 text-sm">
                  {{ galgame.value }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="hidden shrink-0 items-center gap-2 sm:flex">
          <KunIcon
            :name="
              galgameSortItem.find((i) => i.sortField === galgame.sortField)
                ?.icon || ''
            "
            class="text-primary h-5 w-5"
          />
          <span class="text-lg font-medium">{{ galgame.value }}</span>
        </div>
      </KunLink>
    </li>
  </ul>
</template>
