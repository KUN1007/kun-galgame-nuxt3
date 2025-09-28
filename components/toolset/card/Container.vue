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
        description="Galgame 工具合集，模拟器, 翻译器, 解包工具, 补丁工具, 资源转换工具, 汉化工具, 开发者工具, 游戏管理工具, 自动化脚本 等 Galgame 工具资源下载"
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
