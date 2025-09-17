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
    class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
  >
    <KunCard
      v-for="t in items"
      :key="t.id"
      :is-transparent="false"
      :is-hoverable="true"
      content-class="space-y-2"
    >
      <div class="flex items-center justify-between gap-2">
        <KunLink :to="`/toolset/${t.id}`" class-name="text-lg font-semibold">
          {{ t.name }}
        </KunLink>
        <div class="flex items-center gap-2">
          <KunBadge color="primary" size="xs">
            {{ KUN_GALGAME_TOOLSET_TYPE_MAP[t.type] || t.type }}
          </KunBadge>
          <span class="text-default-500 text-sm">
            {{ KUN_GALGAME_TOOLSET_VERSION_MAP[t.version] }}
          </span>
        </div>
      </div>
      <p class="text-default-500 line-clamp-3 text-sm">
        {{ t.description }}
      </p>
      <div class="text-default-600 text-xs">
        <span>{{ KUN_GALGAME_TOOLSET_PLATFORM_MAP[t.platform] }}</span>
        <span class="mx-2">·</span>
        <span>{{ KUN_GALGAME_TOOLSET_LANGUAGE_MAP[t.language] }}</span>
      </div>
      <div class="text-default-600 flex items-center justify-between text-xs">
        <div>
          <span>下载 {{ t.download }}</span>
          <span class="mx-2">·</span>
          <span>评论 {{ t.commentCount }}</span>
        </div>
        <div>
          <span v-if="t.practicalityAvg != null">
            实用性 {{ t.practicalityAvg.toFixed(1) }}
          </span>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <KunUser size="sm" :user="t.user" />
      </div>
    </KunCard>
  </div>
</template>
