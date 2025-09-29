<script setup lang="ts">
const route = useRoute()

const seriesId = computed(() => {
  return Number((route.params as { id: string }).id)
})

const { data } = await useFetch(`/api/galgame-series/${seriesId.value}`, {
  method: 'GET',
  query: { seriesId: seriesId.value },
  ...kungalgameResponseHandler
})

if (data.value) {
  if (data.value.isNSFW) {
    useKunDisableSeo(data.value.name)
  } else {
    useKunSeoMeta({
      title: `${data.value.name} 系列下载资源`,
      description: data.value.description
    })
  }
}
</script>

<template>
  <div class="contents">
    <GalgameSeriesDetail :data="data" v-if="data" />
    <KunNull v-else description="未找到这个 Galgame 系列" />
  </div>
</template>
