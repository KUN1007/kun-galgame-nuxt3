<script setup lang="ts">
import { KUN_UPDATE_LOG_TYPE_MAP } from '~/constants/update'
import type { UpdateLog } from '~/types/api/update-log'
import type { UpdateUpdateLogPayload } from './types'

const pageData = ref({
  page: 1,
  limit: 30,
  language: 'zh-cn'
})

const { role } = usePersistUserStore()

const { data, status, refresh } = await useFetch('/api/update/history', {
  method: 'GET',
  query: pageData,
  ...kungalgameResponseHandler
})

const showUpdateLogModal = ref(false)
const editingUpdateLog = ref<UpdateUpdateLogPayload>(
  {} as UpdateUpdateLogPayload
)

const openEditUpdateLogModal = (log: UpdateLog) => {
  if (!data.value) {
    return
  }
  editingUpdateLog.value = {
    version: log.version,
    content_en_us: log.content['en-us'],
    content_zh_cn: log.content['zh-cn'],
    type: log.type,
    updateLogId: log.id
  } satisfies UpdateUpdateLogPayload
  showUpdateLogModal.value = true
}

const handleUpdateLogAction = async (data: UpdateUpdateLogPayload) => {
  const result = await $fetch(`/api/update/history`, {
    method: data.updateLogId ? 'PUT' : 'POST',
    watch: false,
    body: data,
    ...kungalgameResponseHandler
  })

  if (result) {
    useMessage(data.updateLogId ? '更新成功' : '发布更新日志成功', 'success')
    refresh()
  }
}
</script>

<template>
  <div class="space-y-6" v-if="data">
    <KunHeader
      name="更新日志"
      description="本页面记录了网站所有的更新日志, 新特性, BUG 修复, 功能更改, 性能优化等等"
    >
      <template #endContent>
        <div v-if="role > 2" class="flex justify-end">
          <KunButton @click="showUpdateLogModal = true">创建更新日志</KunButton>
        </div>
      </template>
    </KunHeader>
    <KunCard
      :is-hoverable="false"
      :is-transparent="true"
      :is-pressable="false"
      :dark-border="true"
      v-for="update in data.updates"
      :key="update.id"
    >
      <div class="mb-3 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <KunBadge color="primary">
            {{ KUN_UPDATE_LOG_TYPE_MAP[update.type] }}
          </KunBadge>
          <span class="text-default-500 text-sm">
            {{ formatDate(update.created, { isShowYear: true }) }} - Version
            {{ update.version }}
          </span>
        </div>

        <KunButton
          variant="flat"
          size="sm"
          v-if="role > 2"
          @click="openEditUpdateLogModal(update)"
        >
          编辑
        </KunButton>
      </div>
      <pre
        class="bg-default-100 rounded-md p-4 font-mono text-sm break-all whitespace-pre-line"
      >
          {{ update.content['zh-cn'] }}
        </pre
      >
    </KunCard>

    <UpdateHistoryModal
      v-model="showUpdateLogModal"
      :initial-data="editingUpdateLog"
      @submit="handleUpdateLogAction"
    />

    <KunCard :is-hoverable="false" :is-transparent="true">
      <KunPagination
        v-if="data"
        v-model:current-page="pageData.page"
        :total-page="Math.ceil(data.totalCount / pageData.limit)"
        :is-loading="status === 'pending'"
      />
    </KunCard>
  </div>
</template>
