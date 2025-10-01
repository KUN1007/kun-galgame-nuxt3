<script setup lang="ts">
import { GALGAME_RESOURCE_PLATFORM_ICON_MAP } from '~/constants/galgameResource'
import type { GalgameCard } from '~/types/api/galgame'

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
      :dark-border="true"
      v-for="galgame in galgames"
      :key="galgame.id"
      :href="`/galgame/${galgame.id}`"
      class-name="p-0"
    >
      <div class="relative overflow-hidden">
        <KunImage
          :src="galgame.banner.replace(/\.webp$/, '-mini.webp')"
          loading="lazy"
          :alt="getPreferredLanguageText(galgame.name)"
          placeholder="/placeholder.webp"
          class="h-full w-full object-cover transition-transform duration-300"
          :style="{ aspectRatio: '16/9' }"
        />

        <div class="absolute top-2 right-2 left-2 flex justify-between">
          <div class="flex gap-1">
            <template v-if="galgame.platform.length">
              <span
                v-for="(platform, i) in galgame.platform"
                :key="i"
                class="bg-background flex size-6 items-center justify-center rounded-full p-1.5 text-xs backdrop-blur-sm sm:size-8 sm:text-sm"
              >
                <KunIcon
                  :name="GALGAME_RESOURCE_PLATFORM_ICON_MAP[platform]"
                  class="h-4 w-4"
                />
              </span>
            </template>
            <span
              v-else
              class="bg-background rounded-full px-3 py-1 text-xs backdrop-blur-sm sm:text-sm"
            >
              准备中
            </span>
          </div>

          <KunBadge
            variant="solid"
            class-name="opacity-50 absolute top-0 right-0"
            :color="galgame.contentLimit === 'sfw' ? 'success' : 'danger'"
          >
            {{ galgame.contentLimit.toLocaleUpperCase() }}
          </KunBadge>
        </div>

        <div
          class="absolute right-0 bottom-0 left-0 flex items-center justify-between bg-gradient-to-t from-black/60 to-transparent p-2 text-xs transition-opacity duration-300 sm:text-sm"
        >
          <div class="flex gap-3">
            <span class="flex items-center gap-1">
              <KunIcon class="text-white" name="lucide:eye" />
              <span class="text-white">{{ galgame.view }}</span>
            </span>

            <span class="flex items-center gap-1">
              <KunIcon class="text-white" name="lucide:thumbs-up" />
              <span class="text-white">{{ galgame.likeCount }}</span>
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

      <div class="flex flex-auto flex-col justify-between p-2 sm:p-3">
        <h2
          class="hover:text-primary mb-3 line-clamp-2 font-medium transition-colors"
        >
          {{ getPreferredLanguageText(galgame.name) }}
        </h2>

        <div class="text-default-600 flex items-center gap-1 text-sm">
          <KunAvatar :disable-floating="true" :user="galgame.user" size="xs" />
          {{
            `${galgame.user.name} · ${formatTimeDifference(galgame.resourceUpdateTime)}`
          }}
        </div>
      </div>
    </KunCard>
  </div>
</template>
