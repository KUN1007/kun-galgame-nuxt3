<script setup lang="ts">
import { platformIconMap } from '~/components/galgame/utils/iconMap'
import type { HomeGalgame } from '~/types/api/home'

defineProps<{
  galgame: HomeGalgame
}>()
</script>

<template>
  <NuxtLink
    class="group relative flex flex-col gap-3 rounded-lg border p-4 shadow transition-all hover:shadow-md"
    :to="`/galgame/${galgame.gid}`"
  >
    <h3
      class="line-clamp-2 text-lg font-medium text-gray-900 dark:text-gray-100"
    >
      {{ galgame.name['zh-cn'] }}
      <span class="text-default-500 ml-2 text-sm">
        {{ formatTimeDifference(galgame.time) }}
      </span>
    </h3>

    <div class="flex items-center justify-between">
      <div class="flex gap-1">
        <KunAvatar
          v-for="(user, index) in galgame.contributors"
          :key="index"
          :user="user"
          size="30px"
        />
      </div>

      <div class="flex items-center gap-1">
        <span class="views">
          <span><Icon class="icon" name="lucide:eye" /></span>
          <span>{{ galgame.views }}</span>
        </span>

        <div class="platform">
          <span v-for="(platform, i) in galgame.platforms" :key="i">
            <Icon class="icon" :name="platformIconMap[platform]" />
          </span>
        </div>

        <div class="language">
          <span v-for="(lang, i) in galgame.languages" :key="i">
            {{ lang.substring(0, 2).toUpperCase() }}
          </span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
