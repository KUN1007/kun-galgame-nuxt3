<script setup lang="ts">
const props = defineProps<{
  uid: number
}>()

const pageData = reactive({
  page: 1,
  limit: 50
})

const { data, status } = await useFetch(`/api/user/${props.uid}/comments`, {
  method: 'GET',
  query: pageData,
  ...kungalgameResponseHandler
})
</script>

<template>
  <div class="space-y-6">
    <KunHeader
      name="评论列表"
      description="这是您在论坛中发布的所有评论的列表, 这里仅显示了话题下的评论, Galgame 下的评论还在咕咕咕, 杂鱼杂鱼臭杂鱼"
    />

    <div class="flex flex-col space-y-3" v-if="data && data.comments.length">
      <KunCard
        :is-pressable="true"
        v-for="(comment, index) in data.comments"
        :key="index"
        :href="`/topic/${comment.tid}`"
      >
        <div>
          {{ comment.content }}
        </div>
        <div class="text-default-500 text-sm">
          {{ formatDate(comment.time, { isShowYear: true }) }}
        </div>
      </KunCard>

      <KunPagination
        class="pagination"
        v-if="data.totalCount > 50"
        :page="pageData.page"
        :limit="pageData.limit"
        :sum="data.totalCount"
        :status="status"
        @set-page="(newPage) => (pageData.page = newPage)"
      />
    </div>
  </div>
</template>
