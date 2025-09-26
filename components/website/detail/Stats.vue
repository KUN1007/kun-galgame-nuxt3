<script setup lang="ts">
import type { WebsiteDetail } from '~/types/api/website'

defineProps<{
  data: WebsiteDetail
}>()
</script>

<template>
  <KunCard
    :is-transparent="false"
    :is-hoverable="false"
    :is-pressable="false"
    class-name="p-6"
  >
    <h3 class="text-default-900 mb-4 text-lg font-semibold">统计信息</h3>
    <div class="space-y-3">
      <div class="flex items-center justify-between">
        <span class="text-default-600">总访问量</span>
        <span class="text-default-900 font-semibold">
          {{ formatNumber(data.view) }}
        </span>
      </div>
      <div class="flex items-center justify-between">
        <span class="text-default-600">点赞数</span>
        <span class="text-default-900 font-semibold">
          {{ formatNumber(data.likeCount) }}
        </span>
      </div>
      <div class="flex items-center justify-between">
        <span class="text-default-600">收藏数</span>
        <span class="text-default-900 font-semibold">
          {{ formatNumber(data.favoriteCount) }}
        </span>
      </div>
      <div class="flex items-center justify-between">
        <span class="text-default-600">网站建立时间</span>
        <span class="text-default-900 font-semibold">
          {{ data.createTime }}
        </span>
      </div>
      <div class="flex items-center justify-between">
        <span class="text-default-600">网站索引时间</span>
        <span class="text-default-900 font-semibold">
          {{ formatDate(data.created, { isShowYear: true, isPrecise: true }) }}
        </span>
      </div>
    </div>
  </KunCard>
</template>
