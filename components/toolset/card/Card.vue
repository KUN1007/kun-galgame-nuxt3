<script setup lang="ts">
import type { ToolsetCard } from '~/types/api/toolset'
import {
  KUN_GALGAME_TOOLSET_TYPE_MAP,
  KUN_GALGAME_TOOLSET_PLATFORM_MAP,
  KUN_GALGAME_TOOLSET_LANGUAGE_MAP,
  KUN_GALGAME_TOOLSET_VERSION_MAP
} from '~/constants/toolset'

defineProps<{
  items: ToolsetCard[]
}>()
</script>

<template>
  <div
    class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
  >
    <KunCard
      v-for="t in items"
      :key="t.id"
      :href="`/toolset/${t.id}`"
      :is-transparent="false"
      :is-hoverable="true"
      :is-pressable="true"
      content-class="space-y-3 group"
    >
      <h2 class="group-hover:text-primary truncate text-base text-lg">
        {{ t.name }}
      </h2>

      <p class="text-default-600 text-xs">
        {{ KUN_GALGAME_TOOLSET_VERSION_MAP[t.version] || t.version }}
        <span class="mx-1">·</span>
        {{ KUN_GALGAME_TOOLSET_PLATFORM_MAP[t.platform] || t.platform }}
        <span class="mx-1">·</span>
        {{ KUN_GALGAME_TOOLSET_LANGUAGE_MAP[t.language] || t.language }}
      </p>

      <div class="text-default-600 flex items-center justify-between text-xs">
        <div class="flex gap-2">
          <span>浏览 {{ t.view }}</span>
          <span>下载 {{ t.download }}</span>
        </div>
        <span v-if="t.practicalityAvg != null">
          实用性 {{ t.practicalityAvg.toFixed(1) }}
        </span>
      </div>

      <div class="flex items-center gap-2">
        <KunUser size="sm" :user="t.user" />
        <span class="text-default-500 text-xs">
          {{ formatTimeDifference(t.resource_update_time) }}
        </span>

        <KunBadge class-name="ml-auto" color="primary" size="sm">
          {{ KUN_GALGAME_TOOLSET_TYPE_MAP[t.type] || t.type }}
        </KunBadge>
      </div>
    </KunCard>
  </div>
</template>
