<script setup lang="ts">
import type { ToolsetResource } from '~/types/api/toolset'

defineProps<{
  toolsetId: number
  resources: ToolsetResource[]
}>()

const emits = defineEmits<{
  deleted: [number]
  updated: [ToolsetResource]
}>()
</script>

<template>
  <div class="space-y-3">
    <KunHeader
      name="Galgame 工具下载资源"
      description="您可以在这里添加或下载 Galgame 工具资源, S3 对象存储是直链不限速的下载方式"
      scale="h2"
    />

    <KunNull
      v-if="!resources || resources.length === 0"
      description="暂无 Galgame 工具下载资源"
    />

    <div v-else class="space-y-3">
      <ToolsetResourceItem
        v-for="res in resources"
        :key="res.id"
        :toolset-id="toolsetId"
        :resource="res"
        @deleted="(id) => emits('deleted', id)"
        @updated="(r) => emits('updated', r)"
      />
    </div>
  </div>
</template>
