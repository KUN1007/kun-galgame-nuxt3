<script setup lang="ts">
const pageData = reactive({
  page: 1,
  limit: 30
})

const { data, status } = await useFetch(`/api/non-moe`, {
  method: 'GET',
  query: pageData,
  ...kungalgameResponseHandler
})
</script>

<template>
  <KunCard
    :is-hoverable="false"
    :is-transparent="false"
    content-class="space-y-6"
    v-if="data"
  >
    <KunHeader
      name="不萌记录"
      description="这里记录了迄今为止所有被处罚的记录，希望大家不要这样做"
    />

    <div class="space-y-6">
      <NonMoeLog v-if="data.logs.length" :logs="data.logs" />

      <div
        v-if="!data.logs.length"
        class="text-default-500 py-12 text-center italic"
      >
        暂无不萌记录
      </div>

      <KunPagination
        v-if="data.total > 30"
        :page="pageData.page"
        :limit="pageData.limit"
        :sum="data.total"
        :status="status"
        @set-page="(newPage) => (pageData.page = newPage)"
        class="mt-8"
      />
    </div>
  </KunCard>
</template>
