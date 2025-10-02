<script setup lang="ts">
import type { UpdateGalgameSeriesPayload } from '../types'

const pageData = reactive({
  page: 1,
  limit: 12
})

const { data, status } = await useFetch('/api/galgame-series', {
  method: 'GET',
  query: pageData,
  ...kungalgameResponseHandler
})

const showSeriesModal = ref(false)

const handleCreateSeries = async (data: UpdateGalgameSeriesPayload) => {
  const result = await $fetch(`/api/galgame-series`, {
    method: 'POST',
    watch: false,
    body: data,
    ...kungalgameResponseHandler
  })

  if (result) {
    useMessage('创建 Galgame 系列成功', 'success')
  }
}
</script>

<template>
  <KunCard
    :is-hoverable="false"
    :is-pressable="false"
    :is-transparent="false"
    content-class="space-y-3"
  >
    <KunHeader
      name="Galgame 系列"
      description="Galgame 全系列所有 Galgame 作品。例如美少女万华镜 1, 2, 3, 4, 5, 雪女, 外传 就是一个 Galgame 系列。某个会社制作的所有 Galgame 并不算系列, 请到 Galgame 会社页面中查看"
    >
      <template #endContent>
        <div class="flex justify-end">
          <KunButton @click="showSeriesModal = true">创建系列</KunButton>
        </div>
      </template>
    </KunHeader>

    <GalgameSeriesModal
      v-model="showSeriesModal"
      :initial-data="{} as UpdateGalgameSeriesPayload"
      @submit="handleCreateSeries"
    />

    <div v-if="data" class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <GalgameSeriesCard
        v-for="(series, index) in data.series"
        :key="series.id"
        :style="{ animationDelay: `${index * 50}ms` }"
        :series="series"
      />
    </div>

    <KunPagination
      v-if="data && data.totalCount > pageData.limit"
      v-model:current-page="pageData.page"
      :total-page="Math.ceil(data.totalCount / pageData.limit)"
      :is-loading="status === 'pending'"
    />
  </KunCard>
</template>
