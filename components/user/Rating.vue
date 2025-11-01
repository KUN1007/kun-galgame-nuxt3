<script setup lang="ts">
const props = defineProps<{
  uid: number
}>()

const pageData = reactive({
  page: 1,
  limit: 24,
  userId: props.uid
})

const { data, status } = await useFetch(`/api/user/${props.uid}/ratings`, {
  method: 'GET',
  query: pageData,
  ...kungalgameResponseHandler
})
</script>

<template>
  <div class="space-y-3">
    <KunHeader
      name="Galgame 评分"
      description="这是您的 Galgame 评分列表, 您可以在这里查看您发布的所有 Galgame 评分"
    />

    <div v-if="data && data.ratingData.length" class="space-y-3">
      <GalgameRatingCard :ratings="data.ratingData" />

      <KunPagination
        v-if="data.totalCount > pageData.limit"
        v-model:current-page="pageData.page"
        :total-page="Math.ceil(data.totalCount / pageData.limit)"
        :is-loading="status === 'pending'"
      />
    </div>

    <KunNull v-if="data && !data.ratingData.length" description="暂无评分" />
  </div>
</template>
