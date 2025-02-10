<script setup lang="ts">
const route = useRoute()
const gid = computed(() => {
  return parseInt((route.params as { gid: string }).gid)
})

const pageData = reactive({
  page: 1,
  limit: 7
})

const { data, status, refresh } = await useLazyFetch(
  `/api/galgame/${gid.value}/pr/all`,
  {
    method: 'GET',
    query: pageData,
    ...kungalgameResponseHandler
  }
)
</script>

<template>
  <div class="container" v-if="data && data.prs.length">
    <KunHeader :size="2" :show-help="true">
      <template #header>更新请求</template>
      <template #help>
        蓝色代表增加, 红色代表删减, 游戏发布者或管理员可以合并或拒绝请求
      </template>
    </KunHeader>

    <div v-if="status === 'success'">
      <GalgamePrInfo
        v-for="(pr, index) in data.prs"
        :key="index"
        :gid="gid"
        :pr="pr"
        :status="status"
        :refresh="refresh"
      />
    </div>
    <KunSkeletonGalgameResource v-if="status === 'pending'" />

    <KunPagination
      class="pagination"
      v-if="data.totalCount > 7"
      :page="pageData.page"
      :limit="pageData.limit"
      :sum="data.totalCount"
      :status="status"
      @set-page="(newPage) => (pageData.page = newPage)"
    />
  </div>
</template>

<style lang="scss" scoped></style>
