<script setup lang="ts">
const route = useRoute()
const gid = computed(() => {
  return parseInt((route.params as { gid: string }).gid)
})

const { data, pending, refresh } = await useLazyFetch(
  `/api/galgame/${gid.value}/pr/all`,
  {
    method: 'GET',
    ...kungalgameResponseHandler
  }
)
</script>

<template>
  <div class="container" v-if="data && data.length">
    <KunHeader :size="2">
      <template #header>更新请求</template>
    </KunHeader>

    <GalgamePrInfo
      v-for="(pr, index) in data"
      :key="index"
      :gid="gid"
      :pr="pr"
      :pending="pending"
      :refresh="refresh"
    />
  </div>
</template>

<style lang="scss" scoped></style>
