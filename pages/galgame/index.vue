<script setup lang="ts">
const { page, limit, category, sortOrder } = storeToRefs(useTempPoolStore())
const isLoadingComplete = ref(false)

const getTopics = async () => {
  const { data } = await useFetch(`/api/galgame`, {
    method: 'GET',
    query: { page, limit, sortField, sortOrder },
    watch: false,
    ...kungalgameResponseHandler
  })
  return data.value ?? []
}
</script>

<template>
  <div class="galgame">
    <div class="nav"></div>
    <div class="container"></div>
  </div>
</template>

<style lang="scss" scoped>
.galgame {
  height: calc(100dvh - 75px);
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
}
</style>
