<script setup lang="ts">
import type { UpdateGalgameSeriesPayload } from '../types'
import type { GalgameSeriesDetail } from '~/types/api/galgame-series'

const props = defineProps<{
  data: GalgameSeriesDetail
}>()

const { role } = usePersistUserStore()
const showSeriesModal = ref(false)
const editingSeries = ref<UpdateGalgameSeriesPayload>(
  {} as UpdateGalgameSeriesPayload
)

const openEditSeriesModal = () => {
  if (!props.data) {
    return
  }
  const res = props.data
  editingSeries.value = {
    seriesId: res.id,
    name: res.name,
    description: res.description,
    galgameIds: res.galgame.map((g) => g.id)
  } satisfies UpdateGalgameSeriesPayload
  showSeriesModal.value = true
}

const handleUpdateSeries = async (data: UpdateGalgameSeriesPayload) => {
  const result = await $fetch(`/api/galgame-series/${props.data.id}`, {
    method: 'PUT',
    watch: false,
    body: data,
    ...kungalgameResponseHandler
  })

  if (result) {
    useMessage('重新编辑成功', 'success')
  }
}

const handleDeleteSeries = async () => {
  const res = await useComponentMessageStore().alert(
    '确定删除这个 Galgame 系列吗?',
    '注意, 删除操作不可撤销'
  )
  if (!res) {
    return
  }

  const result = await $fetch(`/api/galgame-series/${props.data.id}`, {
    method: 'DELETE',
    watch: false,
    query: { seriesId: props.data.id },
    ...kungalgameResponseHandler
  })

  if (result) {
    useMessage('删除 Galgame 系列成功', 'success')
    navigateTo('/galgame-series')
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
    <KunHeader :name="`${data.name} 系列`" :description="data.description">
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

          <div class="flex justify-end gap-1">
            <KunButton
              v-if="role > 2"
              variant="light"
              color="danger"
              @click="handleDeleteSeries"
            >
              删除系列
            </KunButton>
            <KunButton @click="openEditSeriesModal">编辑系列</KunButton>
          </div>
        </div>
      </template>
    </KunHeader>

    <GalgameSeriesModal
      v-model="showSeriesModal"
      :initial-data="editingSeries"
      @submit="handleUpdateSeries"
    />

    <GalgameCard :is-transparent="true" :galgames="data.galgame" />
  </KunCard>
</template>
