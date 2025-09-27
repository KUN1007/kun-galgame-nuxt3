<script setup lang="ts">
const pageData = storeToRefs(useTempToolsetStore())

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
        name="Galgame 工具资源下载"
        description="收录 Galgame 相关工具：模拟器、翻译器、提取器等"
        :is-show-divider="false"
      >
        <template #endContent>
          <ToolsetCardNav />
        </template>
      </KunHeader>
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
        v-model:current-page="pageData.page.value"
        :total-page="Math.ceil(data.totalCount / pageData.limit.value)"
        :is-loading="status === 'pending'"
      />
    </KunCard>
  </div>
</template>
