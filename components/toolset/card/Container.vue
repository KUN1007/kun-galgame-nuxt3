<script setup lang="ts">
const pageData = reactive({
  page: 1,
  limit: 48
})

const { data, status } = await useFetch(`/api/toolset`, {
  method: 'GET',
  query: pageData,
  ...kungalgameResponseHandler
})
</script>

<template>
  <div v-if="data" class="flex flex-col gap-3">
    <KunCard class-name="z-10" :is-hoverable="false" :is-transparent="false">
      <KunHeader
        name="Galgame 工具集"
        description="收录与 Galgame 相关的工具：模拟器、文本提取、系统辅助、补丁汉化等"
        :is-show-divider="false"
      />
    </KunCard>

    <KunLoading :loading="status === 'pending'">
      <ToolsetCard v-if="data.items" :items="data.items" />
    </KunLoading>

    <KunCard
      :is-hoverable="false"
      :is-transparent="false"
      content-class="gap-3"
    >
      <KunPagination
        v-model:current-page="pageData.page"
        :total-page="Math.ceil(data.totalCount / pageData.limit)"
        :is-loading="status === 'pending'"
      />
    </KunCard>
  </div>
</template>
