<script setup lang="ts">
import type { HomeGalgame, HomeTopic } from '~/types/api/home'

defineProps<{
  galgames: HomeGalgame[]
}>()
</script>

<template>
  <div class="space-y-3">
    <KunCard
      :is-hoverable="false"
      :is-transparent="false"
      class-name="sm:p-6 p-3"
      content-class="space-y-6"
    >
      <div class="space-y-3">
        <div class="flex items-center justify-start gap-3">
          <h2 class="text-lg sm:text-2xl">最新 Galgame</h2>
          <KunButton size="sm" variant="light" href="/galgame"
            >查看更多 ></KunButton
          >
        </div>
        <p class="text-default-500">
          默认仅展示 SFW (内容安全的内容), 您可以打开 NSFW (会显示涩涩等内容,
          不适合在公共场合打开)
        </p>
        <GalgameCardNSFWHint />
      </div>
    </KunCard>

    <GalgameCard :galgames="galgames" :is-transparent="false" />
  </div>
</template>
