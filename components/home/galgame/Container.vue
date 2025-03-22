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
    <KunCard
      :is-hoverable="false"
      :is-transparent="false"
      content-class="flex-row justify-start items-center gap-2"
    >
      <h2 class="text-xl font-semibold">最新 Galgame</h2>
      <KunLink
        underline="none"
        class-name="text-default-500 hover:text-primary text-sm transition-colors"
        to="/galgame"
      >
        查看更多 >
      </KunLink>
    </KunCard>

    <GalgameCard :galgames="data" :is-transparent="false" />
  </div>
</template>
