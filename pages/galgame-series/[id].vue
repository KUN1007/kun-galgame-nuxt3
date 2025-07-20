<script setup lang="ts">
const route = useRoute()
const seriesId = route.params.id

const { data } = await useFetch(`/api/galgame-series/${seriesId}`, {
  method: 'GET',
  query: { seriesId },
  ...kungalgameResponseHandler
})

if (data.value) {
  if (data.value.isNSFW) {
    useKunDisableSeo(data.value.name)
  } else {
    useKunSeoMeta({
      title: data.value.name,
      description: data.value.description
    })
  }
}
</script>

<template>
  <GalgameSeriesDetail :data="data" v-if="data" />

  <KunNull v-else description="未找到这个 Galgame 系列" />
</template>
