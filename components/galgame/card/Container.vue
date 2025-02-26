<script setup lang="ts">
const pageData = storeToRefs(useTempGalgameStore())

const { data, status } = await useFetch(`/api/galgame`, {
  method: 'GET',
  query: pageData,
  ...kungalgameResponseHandler
})
</script>

<template>
  <div class="flex flex-col gap-3">
    <GalgameCardNav />

    <GalgameCard v-if="data?.galgames" :galgames="data?.galgames" />

    <div class="text-default-600 text-center text-sm select-none">
      我们不是资源的提供者, 我们只是资源的指路人
    </div>

    <KunPagination
      class="pagination"
      v-if="data?.totalCount"
      :page="pageData.page.value"
      :limit="pageData.limit.value"
      :sum="data?.totalCount"
      :status="status"
      @set-page="(newPage) => (pageData.page.value = newPage)"
    />

    <KunFooter />
  </div>
</template>
