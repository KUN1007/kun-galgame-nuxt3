<script setup lang="ts">
import {
  typeIconMap,
  platformIconMap
} from '~/components/galgame/utils/iconMap'
import {
  KUN_GALGAME_RESOURCE_TYPE_MAP,
  KUN_GALGAME_RESOURCE_LANGUAGE_MAP
} from '~/constants/galgame'

const { data } = await useFetch(`/api/home/resource`, {
  method: 'GET',
  query: {
    page: 1,
    limit: 10
  }
})
</script>

<template>
  <div class="w-full space-y-3 rounded-lg" v-if="data">
    <h2 class="text-xl font-semibold">最新 Galgame 资源</h2>

    <div class="rounded-lg border shadow">
      <NuxtLink
        v-for="(link, index) in data"
        :key="index"
        :to="`/galgame/${link.gid}`"
        class="group flex items-start space-x-3 rounded-lg p-3 transition-colors"
      >
        <div
          class="bg-primary/10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full"
        >
          <Icon
            :name="platformIconMap[link.platform]"
            class="text-primary h-4 w-4"
          />
        </div>

        <div class="space-y-2">
          <h3
            class="hover:text-primary line-clamp-3 break-all transition-colors"
          >
            {{ getPreferredLanguageText(link.name) }}

            <span class="text-default-500 text-sm">
              {{ formatTimeDifference(link.time) }}
            </span>
          </h3>

          <div class="text-default-700 flex gap-4 text-sm">
            <span class="flex items-center gap-1">
              <Icon class="icon" :name="typeIconMap[link.type]" />
              {{ KUN_GALGAME_RESOURCE_TYPE_MAP[link.type] }}
            </span>

            {{ KUN_GALGAME_RESOURCE_LANGUAGE_MAP[link.language] }}
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
