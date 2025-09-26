<script setup lang="ts">
const pageData = reactive({
  page: 1,
  limit: 50
})

const { data, status } = await useFetch(`/api/galgame-resource`, {
  method: 'GET',
  query: pageData
})

useKunSeoMeta({
  title: '最新 Galgame 资源下载',
  description:
    '在本页面查看网站所有 Galgame 下载资源列表, 包括 PC / Windows, 手机, 模拟器 / KRKR / Tyranor 等等'
})
</script>

<template>
  <KunCard
    :is-transparent="false"
    v-if="data"
    content-class="space-y-3"
    :is-hoverable="false"
  >
    <KunHeader
      name="最新 Galgame 资源下载"
      description="在本页面查看网站所有 Galgame 下载资源列表, 包括 PC / Windows, 手机, 模拟器 / KRKR / Tyranor 等等"
    />

    <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
      <GalgameResourceCard
        v-for="(resource, index) in data.resources"
        :key="index"
        :resource="resource"
      />
    </div>

    <KunPagination
      v-if="data.totalCount > pageData.limit"
      v-model:current-page="pageData.page"
      :total-page="Math.ceil(data.totalCount / pageData.limit)"
      :is-loading="status === 'pending'"
    />
  </KunCard>
</template>
