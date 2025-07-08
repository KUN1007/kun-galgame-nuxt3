<script setup lang="ts">
import {
  GALGAME_RESOURCE_TYPE_ICON_MAP,
  GALGAME_RESOURCE_PLATFORM_ICON_MAP
} from '~/constants/galgameResource'
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
  <KunCard
    :is-transparent="false"
    v-if="data"
    content-class="space-y-3"
    :is-hoverable="false"
  >
    <h2 class="text-xl font-semibold">最新 Galgame 资源</h2>

    <KunLink
      underline="none"
      v-for="(link, index) in data"
      :key="index"
      :to="`/galgame/${link.galgameId}`"
      class-name="group flex flex-nowrap items-start gap-3 rounded-lg transition-colors"
    >
      <div
        class="bg-primary/10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full"
      >
        <KunIcon
          :name="GALGAME_RESOURCE_PLATFORM_ICON_MAP[link.platform]"
          class="text-primary h-4 w-4"
        />
      </div>

      <div class="space-y-2">
        <h3 class="hover:text-primary line-clamp-3 break-all transition-colors">
          {{ getPreferredLanguageText(link.galgameName) }}

          <span class="text-default-500 text-sm">
            {{ formatTimeDifference(link.created) }}
          </span>
        </h3>

        <div class="text-default-700 flex gap-4 text-sm">
          <span class="flex items-center gap-1">
            <KunIcon
              class="icon"
              :name="GALGAME_RESOURCE_TYPE_ICON_MAP[link.type]"
            />
            {{ KUN_GALGAME_RESOURCE_TYPE_MAP[link.type] }}
          </span>

          {{ KUN_GALGAME_RESOURCE_LANGUAGE_MAP[link.language] }}
        </div>
      </div>
    </KunLink>
  </KunCard>
</template>
