<script setup lang="ts">
const pageData = reactive({
  page: 1,
  limit: 30
})

const { data, status } = await useFetch(`/api/unmoe`, {
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
      <UnmoeLog v-if="data.logs.length" :logs="data.logs" />

      <div
        v-if="!data.logs.length"
        class="text-default-500 py-12 text-center italic"
      >
        暂无不萌记录
      </div>

      <KunPagination
        v-model:current-page="pageData.page"
        :total-page="Math.ceil(data.total / pageData.limit)"
        :is-loading="status === 'pending'"
      />
    </div>
  </KunCard>
</template>
