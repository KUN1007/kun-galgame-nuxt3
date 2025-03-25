<script setup lang="ts">
import { platformIconMap } from '../utils/iconMap'
import type { GalgameCard } from '@/types/api/galgame'

defineProps<{
  galgames: GalgameCard[]
  isTransparent?: boolean
}>()
</script>

<template>
  <div
    class="grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 xl:grid-cols-4"
  >
    <KunCard
      :is-transparent="isTransparent"
      :is-pressable="true"
      v-for="galgame in galgames"
      :key="galgame.gid"
      :href="`/galgame/${galgame.gid}`"
      class-name="p-0"
    >
      <div class="relative overflow-hidden">
        <NuxtImg
          :src="galgame.banner.replace(/\.webp$/, '-mini.webp')"
          loading="lazy"
          :alt="galgame.name['zh-cn']"
          placeholder="/placeholder.webp"
          class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          :style="{ aspectRatio: '16/9' }"
        />

        <div class="absolute top-2 left-2 flex gap-1">
          <template v-if="galgame.platform.length">
            <span
              v-for="(platform, i) in galgame.platform"
              :key="i"
              class="bg-background flex size-6 items-center justify-center rounded-full p-1.5 text-xs backdrop-blur-sm sm:size-8 sm:text-sm"
            >
              <Icon :name="platformIconMap[platform]" class="h-full w-full" />
            </span>
          </template>
          <span
            v-else
            class="bg-background rounded-full px-3 py-1 text-xs backdrop-blur-sm sm:text-sm"
          >
            准备中
          </span>
        </div>

        <div
          class="absolute right-0 bottom-0 left-0 flex items-center justify-between bg-gradient-to-t from-black/60 to-transparent p-2 text-xs transition-opacity duration-300 sm:text-sm"
        >
          <div class="flex gap-3">
            <span class="flex items-center gap-1">
              <Icon class="text-white" name="lucide:eye" />
              <span class="text-white">{{ galgame.views }}</span>
            </span>

            <span class="flex items-center gap-1">
              <Icon class="text-white" name="lucide:thumbs-up" />
              <span class="text-white">{{ galgame.likes }}</span>
            </span>
          </div>

          <div class="flex gap-2">
            <span
              class="text-white"
              v-for="(lang, i) in galgame.language"
              :key="i"
            >
              {{ lang.substring(0, 2).toUpperCase() }}
            </span>
          </div>
        </div>
      </div>

      <div class="flex flex-auto flex-col justify-between p-3">
        <h3
          class="text-middle hover:text-primary mb-3 line-clamp-2 font-medium transition-colors sm:text-lg"
        >
          {{ getPreferredLanguageText(galgame.name) }}
        </h3>

        <div class="flex items-center gap-3">
          <KunAvatar :user="galgame.user" />
          <div class="flex flex-col">
            <span class="text-sm font-medium">
              {{ galgame.user.name }}
            </span>
            <span class="text-default-600 text-xs">
              {{ formatTimeDifference(galgame.time) }}
            </span>
          </div>
        </div>
      </div>
    </KunCard>
  </div>
</template>
