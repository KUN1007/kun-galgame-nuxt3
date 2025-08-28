<script setup lang="ts">
import { KUN_TOPIC_SECTION } from '~/constants/topic'
import type { SectionStats } from '~/types/api/category'

defineProps<{
  sections: SectionStats[]
  categoryName: string
}>()
</script>

<template>
  <div class="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
    <KunCard
      :is-transparent="true"
      :is-pressable="true"
      :dark-border="true"
      v-for="section in sections"
      :key="section.id"
      :href="`/section/${section.name}`"
    >
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-lg font-semibold">
          {{ KUN_TOPIC_SECTION[section.name] }}
        </h2>
        <div class="text-default-500 flex items-center gap-4 text-sm">
          <div class="flex items-center gap-2 text-inherit">
            <KunIcon name="lucide:newspaper" />
            {{ formatNumber(section.topicCount) }}
          </div>
          <div class="flex items-center gap-2 text-inherit">
            <KunIcon name="lucide:eye" />
            {{ formatNumber(section.viewCount) }}
          </div>
        </div>
      </div>

      <div class="space-y-2">
        <h3 class="line-clamp-1">
          {{ section.latestTopic?.title }}
        </h3>
        <p class="text-default-500 text-sm">
          {{ formatTimeDifference(section.latestTopic?.created || '') }}
        </p>
      </div>
    </KunCard>
  </div>
</template>
