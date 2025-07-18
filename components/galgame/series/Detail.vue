<script setup lang="ts">
import type { GalgameSeriesDetail } from '~/types/api/galgame-series'

defineProps<{
  data: GalgameSeriesDetail
}>()
</script>

<template>
  <KunCard
    :is-hoverable="false"
    :is-pressable="false"
    :is-transparent="false"
    content-class="space-y-3"
  >
    <KunHeader :name="data.name" :description="data.description">
      <template #endContent>
        <div class="flex flex-col flex-wrap gap-3 text-sm">
          <div class="text-default-500 flex items-center gap-2">
            <KunIcon name="lucide:gamepad-2" />
            <span class="font-medium">
              共计 {{ data.galgame.length }} 部 Galgame
            </span>
          </div>

          <div class="text-default-500 space-x-2">
            <span>
              创建于
              {{ formatDate(data.created, { isShowYear: true }) }}
            </span>
            ·
            <span>
              更新于
              {{ formatTimeDifference(data.updated) }}
            </span>
          </div>
        </div>
      </template>
    </KunHeader>

    <GalgameCard :galgames="data.galgame" />
  </KunCard>
</template>
