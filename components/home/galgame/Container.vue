<script setup lang="ts">
const { data } = await useFetch(`/api/home/galgame`, {
  method: 'GET',
  query: { page: 1, limit: 12 }
})
</script>

<template>
  <div class="space-y-3" v-if="data">
    <KunCard :is-hoverable="false" :is-transparent="false">
      <div class="flex items-center justify-start gap-2">
        <h2 class="text-xl font-semibold">最新 Galgame</h2>
        <KunLink
          underline="none"
          class-name="text-default-500 hover:text-primary text-sm transition-colors"
          to="/galgame"
        >
          查看更多 >
        </KunLink>
      </div>
      <p class="text-default-500">
        默认仅展示 SFW (内容安全的内容), 您可以打开 NSFW (会显示涩涩等内容,
        不适合在公共场合打开)
      </p>
      <div class="w-full">
        <KunSettingPanelComponentsNSFW />
      </div>
    </KunCard>

    <GalgameCardNSFWHint />

    <GalgameCard :galgames="data" :is-transparent="false" />
  </div>
</template>
