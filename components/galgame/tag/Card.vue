<script setup lang="ts">
import { KUN_GALGAME_TAG_CATEGORY_MAP } from '~/constants/galgameTag'
import type { GalgameTagItem } from '~/types/api/galgame-tag'

defineProps<{
  tag: GalgameTagItem
}>()
</script>

<template>
  <KunTooltip
    :text="`${KUN_GALGAME_TAG_CATEGORY_MAP[tag.category]} - 含有 ${tag.galgameCount} 个 Galgame`"
  >
    <KunCard
      :is-transparent="true"
      :is-hoverable="true"
      :is-pressable="true"
      :dark-border="true"
      :to="`/galgame-tag/${tag.id}`"
    >
      <h3 class="text-default-900 font-semibold">
        <span
          :class="
            cn(
              'mr-1.5',
              tag.category === 'content' && 'text-primary',
              tag.category === 'sexual' && 'text-danger',
              tag.category === 'technical' && 'text-success'
            )
          "
        >
          #
        </span>
        {{ tag.name }}
        <KunBadge size="xs">
          {{ `+ ${tag.galgameCount}` }}
        </KunBadge>
      </h3>
    </KunCard>
  </KunTooltip>
</template>
