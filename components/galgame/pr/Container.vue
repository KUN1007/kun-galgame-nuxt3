<script setup lang="ts">
const route = useRoute()
const gid = computed(() => {
  return parseInt((route.params as { gid: string }).gid)
})

const pageData = reactive({
  page: 1,
  limit: 10,
  galgameId: gid.value
})

const { data, status, refresh } = await useFetch(
  `/api/galgame/${gid.value}/pr/all`,
  {
    lazy: true,
    method: 'GET',
    query: pageData,
    ...kungalgameResponseHandler
  }
)
</script>

<template>
  <div class="flex flex-col space-y-3" v-if="data">
    <KunHeader
      name="更新请求"
      description="蓝色代表增加, 红色代表删减, 游戏发布者或管理员可以合并或拒绝请求, 您可以自己合并自己为自己创建的游戏提出的更新请求"
      scale="h3"
    />

    <KunLoading v-if="status === 'pending'" />
    <GalgameNull v-if="status !== 'pending' && !data.prs.length" />

    <div class="space-y-2" v-if="status === 'success'">
      <GalgamePrInfo
        v-for="(pr, index) in data.prs"
        :key="index"
        :galgame-id="gid"
        :pr="pr"
        :status="status"
        :refresh="refresh"
      />
    </div>

    <KunPagination
      v-if="data.totalCount > 10 || data.totalCount === 10"
      v-model:current-page="pageData.page"
      :total-page="Math.ceil(data.totalCount / pageData.limit)"
      :is-loading="status === 'pending'"
    />
  </div>
</template>
