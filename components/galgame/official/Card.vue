<script setup lang="ts">
import { KUN_GALGAME_OFFICIAL_LANGUAGE_MAP } from '~/constants/galgameOfficial'
import type { GalgameOfficialItem } from '~/types/api/galgame-official'

defineProps<{
  official: GalgameOfficialItem
}>()

const getOfficialCategoryInfo = (category: string) => {
  switch (category) {
    case 'company':
      return {
        text: '公司',
        class: 'bg-primary-100 text-primary-800'
      }
    case 'individual':
      return {
        text: '个人',
        class: 'bg-success-100 text-success-800'
      }
    case 'amateur':
      return {
        text: '同人',
        class: 'bg-secondary-100 text-secondary-800'
      }
    default:
      return {
        text: category,
        class: 'bg-default-100 text-default-800'
      }
  }
}
</script>

<template>
  <KunCard
    :is-transparent="true"
    :is-hoverable="true"
    :is-pressable="true"
    :to="`/galgame-official/${official.id}`"
    :dark-border="true"
  >
    <h3 class="text-default-900 font-semibold">
      {{ official.name }}
      <KunBadge size="xs">
        {{ `+ ${official.galgameCount}` }}
      </KunBadge>
    </h3>
    <div class="flex items-center gap-x-2">
      <KunBadge
        size="xs"
        class-name="rounded-md"
        :color="
          official.category === 'company'
            ? 'primary'
            : official.category === 'individual'
              ? 'secondary'
              : 'success'
        "
      >
        {{ getOfficialCategoryInfo(official.category).text }}
      </KunBadge>
      <span class="text-default-500 dark:text-default-400 text-xs">
        {{ KUN_GALGAME_OFFICIAL_LANGUAGE_MAP[official.lang] || official.lang }}
      </span>
    </div>
    <div
      v-if="official.alias.length"
      class="text-default-500 flex flex-wrap gap-2"
    >
      <KunBadge
        size="xs"
        color="success"
        v-for="(a, index) in official.alias"
        :key="index"
      >
        {{ a }}
      </KunBadge>
    </div>
  </KunCard>
</template>
