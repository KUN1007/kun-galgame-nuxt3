<script setup lang="ts">
import type { WebsiteCard } from '~/types/api/website'

const props = defineProps<{
  website: WebsiteCard
}>()

const priceInfo = computed(() => {
  const price = props.website.price

  if (price > 200) {
    return {
      tierLabel: '神',
      tierClass: 'text-warning-500/30 bottom-0 text-7xl italic',
      colorClass: 'text-warning-500 text-base'
    }
  }
  if (price > 100) {
    return {
      tierLabel: '优秀',
      tierClass: 'text-success-500/20 bottom-0 text-3xl italic',
      colorClass: 'text-success-600'
    }
  }
  if (price > 0) {
    return {
      tierLabel: '能冲',
      tierClass: 'text-primary-500/20 bottom-0 text-3xl italic',
      colorClass: 'text-default-700'
    }
  }
  return {
    tierLabel: '冲不动',
    tierClass: 'text-danger-500/20 bottom-0 text-3xl italic',
    colorClass: 'text-danger-600'
  }
})
</script>

<template>
  <KunCard
    :is-pressable="true"
    :is-transparent="true"
    :href="`/website/${website.domain}`"
    :dark-border="true"
    class-name="group"
    content-class="space-y-3"
  >
    <div class="flex items-start space-x-4">
      <div class="flex-shrink-0">
        <KunImage
          :src="website.icon"
          :alt="website.name"
          class="h-12 w-12 rounded-2xl object-cover"
        />
      </div>
      <div class="min-w-0 flex-1">
        <h3
          class="group-hover:text-primary-500 text-default-900 truncate text-lg font-semibold transition-colors"
        >
          {{ website.name }}
        </h3>
        <p class="text-default-500 truncate font-mono text-sm">
          {{ website.domain }}
        </p>
      </div>
    </div>

    <p class="text-default-600 line-clamp-2 text-sm leading-relaxed">
      {{ website.description }}
    </p>

    <span :class="cn('absolute', priceInfo.tierClass)">
      {{ priceInfo.tierLabel }}
    </span>

    <div class="text-default-500 flex items-center justify-between text-sm">
      <span>网站价值精算值</span>
      <span :class="cn('font-bold', priceInfo.colorClass)">
        {{ website.price }}
      </span>
    </div>
  </KunCard>
</template>
