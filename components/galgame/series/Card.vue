<script setup lang="ts">
import type { GalgameSeries } from '~/types/api/galgame-series'

const props = defineProps<{
  series: GalgameSeries
}>()

const includedGamesText = computed(() => {
  if (!props.series.sampleGalgame.length) {
    return '暂无 Galgame'
  }
  const names = props.series.sampleGalgame.map(
    (g) => `《${getPreferredLanguageText(g.name)}》`
  )
  return `${names.join('、')}${props.series.galgameCount > 5 ? ' 等' : ''}`
})
</script>

<template>
  <KunCard
    :is-pressable="true"
    :href="`/galgame-series/${series.id}`"
    class-name="group relative flex h-full flex-col overflow-hidden backdrop-blur-none"
    :is-transparent="true"
    :dark-border="true"
  >
    <div class="relative mb-4 h-32 w-full">
      <KunBadge
        variant="solid"
        class="absolute top-2 left-2 z-100"
        :color="series.isNSFW ? 'danger' : 'success'"
      >
        {{ series.isNSFW ? 'NSFW' : 'SFW' }}
      </KunBadge>

      <GalgameSeriesBanner
        :is-n-s-f-w="series.isNSFW"
        :galgames="series.sampleGalgame"
      />
    </div>

    <div class="flex flex-grow flex-col px-1 pb-1">
      <h3
        class="group-hover:text-primary mb-2 line-clamp-2 text-xl font-bold transition-colors"
      >
        {{ `${series.name} 系列` }}
      </h3>

      <p class="text-default-500 mb-4 line-clamp-1 text-xs">
        {{ includedGamesText }}
      </p>

      <div class="mt-auto flex items-center justify-between">
        <div class="text-default-500 flex items-center gap-2 text-sm">
          <KunIcon name="lucide:gamepad-2" class="h-4 w-4" />
          <span>共 {{ series.galgameCount }} 部 Galgame</span>
        </div>

        <div
          class="group-hover:text-primary flex items-center gap-1.5 transition-all group-hover:translate-x-1"
        >
          <span class="text-sm font-medium">查看详情</span>
          <KunIcon name="lucide:arrow-right" class="h-4 w-4" />
        </div>
      </div>
    </div>
  </KunCard>
</template>
