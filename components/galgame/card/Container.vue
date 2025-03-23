<script setup lang="ts">
const pageData = storeToRefs(useTempGalgameStore())

const { data, status } = await useFetch(`/api/galgame`, {
  method: 'GET',
  query: pageData,
  ...kungalgameResponseHandler
})
</script>

<template>
  <div v-if="data" class="flex flex-col gap-3">
    <GalgameCardNav />

    <GalgameCard v-if="data.galgames" :galgames="data.galgames" />

    <div class="text-default-600 text-center text-sm select-none">
      我们不是资源的提供者, 我们只是资源的指路人
    </div>

    <KunPagination
      v-model:current-page="pageData.page.value"
      :total-page="Math.ceil(data.totalCount / pageData.limit.value)"
      :is-loading="status === 'pending'"
    />
  </div>
</template>
