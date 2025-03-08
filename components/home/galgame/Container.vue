<script setup lang="ts">
const { data } = await useFetch(`/api/home/galgame`, {
  method: 'GET',
  query: {
    page: 1,
    limit: 12
  }
})
</script>

<template>
  <div class="space-y-3" v-if="data">
    <div class="flex items-center gap-3">
      <h2 class="text-xl font-semibold">最新 Galgame</h2>
      <NuxtLink class="text-default-600 hover:text-primary text-sm" to="/topic">
        查看更多 >
      </NuxtLink>
    </div>

    <GalgameCard :galgames="data" :is-transparent="true" />
  </div>
</template>
