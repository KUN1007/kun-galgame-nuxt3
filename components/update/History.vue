<script setup lang="ts">
import { KUN_UPDATE_LOG_TYPE_MAP } from '~/constants/update'

const pageData = ref({
  page: 1,
  limit: 10,
  language: 'zh-cn'
})

const { data, status } = await useFetch('/api/update/history', {
  method: 'GET',
  query: pageData,
  ...kungalgameResponseHandler
})

watch(
  () => status.value,
  () => {
    if (status.value === 'success') {
      window?.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
)
</script>

<template>
  <div v-if="data" class="w-full space-y-3">
    <KunCard
      :is-hoverable="false"
      :is-transparent="false"
      v-for="kun in data.updates"
      :key="kun.upid"
    >
      <div class="mb-3 flex items-center gap-3">
        <KunBadge color="primary">
          {{ KUN_UPDATE_LOG_TYPE_MAP[kun.type] }}
        </KunBadge>
        <span class="text-default-500 text-sm">
          {{ kun.time }} - Version {{ kun.version }}
        </span>
      </div>
      <pre
        class="bg-default-100 rounded-md p-4 font-mono text-sm whitespace-pre-line"
      >
          {{ kun.content['zh-cn'] }}
        </pre
      >
    </KunCard>

    <KunPagination
      v-if="data && data.totalCount > 10"
      class="mt-8"
      :page="pageData.page"
      :limit="pageData.limit"
      :sum="data.totalCount"
      :status="status"
      @set-page="(newPage) => (pageData.page = newPage)"
    />
  </div>
</template>
