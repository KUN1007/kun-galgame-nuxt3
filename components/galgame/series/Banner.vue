<script setup lang="ts">
import type { GalgameSample } from '~/types/api/galgame-series'

const props = defineProps<{
  isNSFW: boolean
  galgames: GalgameSample[]
}>()

const banners = computed(() => props.galgames.map((g) => g.banner).slice(0, 5))

const hoverTranslations = [
  'group-hover:translate-x-0',
  'group-hover:translate-x-[50%] translate-x-[10%]',
  'group-hover:translate-x-[100%] translate-x-[20%]',
  'group-hover:translate-x-[150%] translate-x-[30%]',
  'group-hover:translate-x-[200%] translate-x-[40%]'
]
</script>

<template>
  <div class="relative mb-4 h-32 w-full">
    <KunBadge
      variant="solid"
      class="absolute top-2 left-2 z-100"
      :color="isNSFW ? 'danger' : 'success'"
    >
      {{ isNSFW ? 'NSFW' : 'SFW' }}
    </KunBadge>

    <div class="absolute inset-0">
      <div
        v-for="(banner, index) in banners"
        :key="banner"
        :class="
          cn(
            'absolute aspect-video h-full rounded-lg transition-transform duration-500 ease-out',
            hoverTranslations[index]
          )
        "
        :style="{ zIndex: banners.length - index }"
      >
        <KunImage
          :src="banner.replace(/\.webp$/, '-mini.webp')"
          :alt="`Series Banner ${index + 1}`"
          class="h-full w-full rounded-lg object-cover"
          loading="lazy"
          format="webp"
          quality="80"
        />
      </div>
    </div>
  </div>
</template>
