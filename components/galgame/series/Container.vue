<script setup lang="ts">
const { data } = await useFetch('/api/galgame-series', {
  method: 'GET',
  ...kungalgameResponseHandler
})
</script>

<template>
  <KunCard
    :is-hoverable="false"
    :is-pressable="false"
    :is-transparent="false"
    content-class="space-y-3"
  >
    <KunHeader
      name="Galgame 系列"
      description="Galgame 全系列所有 Galgame 作品。例如美少女万华镜 1, 2, 3, 4, 5, 雪女, 外传 就是一个 Galgame 系列"
    >
      <template #endContent>
        <KunSettingPanelComponentsNSFW />
      </template>
    </KunHeader>

    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <GalgameSeriesCard
        v-for="(series, index) in data"
        :key="series.id"
        :style="{ animationDelay: `${index * 50}ms` }"
        :series="series"
      />
    </div>
  </KunCard>
</template>
