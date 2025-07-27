<script setup lang="ts">
import type { WebsiteCard } from '~/types/api/website'

const props = defineProps<{
  website: WebsiteCard
}>()

const totalLevel = computed(() => {
  return props.website.tags.reduce((sum, tag) => sum + tag.level, 0)
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
          class="h-12 w-12 rounded-2xl object-cover shadow-md"
        />
      </div>
      <div class="min-w-0 flex-1">
        <h3
          class="group-hover:text-primary-500 text-default-900 truncate text-lg font-semibold transition-colors"
        >
          {{ website.name }}
        </h3>
        <p class="text-default-500 font-mono text-sm">{{ website.domain }}</p>
      </div>
    </div>

    <p class="text-default-600 line-clamp-2 text-sm leading-relaxed">
      {{ website.description }}
    </p>

    <div class="mb-4 flex min-h-[28px] flex-wrap gap-2">
      <WebsiteTag :tags="website.tags" :length="3" />
      <div
        v-if="website.tags.length > 3"
        class="bg-default-100 text-default-600 inline-flex items-center rounded-full px-2 py-1 text-xs font-medium"
        :title="`还有 ${website.tags.length - 3} 个标签`"
      >
        +{{ website.tags.length - 3 }}
      </div>
    </div>

    <div class="text-default-500 flex items-center justify-between text-sm">
      <span>网站价值精算值</span>
      <span class="font-bold">
        {{ totalLevel }}
      </span>
    </div>
  </KunCard>
</template>
