<script setup lang="ts">
const route = useRoute()
const seriesId = route.params.id

const { data } = await useFetch(`/api/galgame-series/${seriesId}`, {
  method: 'GET',
  query: { seriesId },
  ...kungalgameResponseHandler
})

useHead({
  link: [
    {
      rel: 'canonical',
      href: `${kungal.domain.main}/series/${seriesId}`
    }
  ]
})

useKunSeoMeta({
  title: `${data.value?.name} - 资源 wiki`,
  description: data.value?.description
})
</script>

<template>
  <GalgameSeriesDetail :data="data" v-if="data" />

  <KunNull v-else description="未找到这个 Galgame 系列" />
</template>
