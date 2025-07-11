<script setup lang="ts">
import { KUN_GALGAME_RESOURCE_PULL_REQUEST_STATUS_MAP } from '~/constants/galgame'
import type { GalgamePR, GalgamePRDetails } from '~/types/api/galgame-pr'

const props = defineProps<{
  galgameId: number
  pr: GalgamePR
  status: UseFetchStatus
  refresh: () => void
}>()

const iconMap: Record<number, string> = {
  0: 'lucide:loader',
  1: 'lucide:check',
  2: 'lucide:x'
}
const statusColorMap: Record<number, string> = {
  0: 'text-primary',
  1: 'text-success',
  2: 'text-danger'
}

const details = ref<Partial<GalgamePRDetails>>()
const isFetching = ref(false)

const handleGetDetails = async (galgamePrId: number) => {
  if (details.value) {
    return
  }
  isFetching.value = true
  const result = await $fetch(`/api/galgame/${props.galgameId}/pr`, {
    method: 'GET',
    query: { galgamePrId },
    watch: false,
    ...kungalgameResponseHandler
  })
  isFetching.value = false

  if (result) {
    details.value = result
  }
}

watch(
  () => props.status,
  () => {
    if (props.status === 'pending') {
      details.value = undefined
    }
  }
)
</script>

<template>
  <div class="space-y-3">
    <div class="flex flex-wrap items-center justify-between">
      <div class="flex flex-wrap items-center gap-2 text-sm">
        <KunAvatar :user="pr.user" />
        <span>{{ pr.user.name }} 提出更新请求</span>
        <span class="text-default-500">
          {{ formatTimeDifference(pr.created) }}
        </span>
      </div>

      <div class="flex gap-1 text-sm">
        <span
          class="flex items-center gap-1"
          :class="statusColorMap[pr.status]"
        >
          <span v-if="pr.completedTime">
            {{
              formatDate(pr.completedTime, {
                isShowYear: true,
                isPrecise: true
              })
            }}
          </span>
          <KunIcon :name="iconMap[pr.status]" />
          <span>
            {{ KUN_GALGAME_RESOURCE_PULL_REQUEST_STATUS_MAP[pr.status] }}
          </span>
        </span>

        <KunButton
          size="sm"
          variant="flat"
          v-if="!details && pr.status !== 2"
          @click="handleGetDetails(pr.id)"
          :loading="isFetching"
        >
          详情
        </KunButton>

        <span v-if="pr.status == 2">{{ `#${pr.index}` }}</span>

        <KunButton
          :is-icon-only="true"
          variant="light"
          color="default"
          rounded="full"
          v-if="details"
          @click="details = undefined"
        >
          <KunIcon name="lucide:x" />
        </KunButton>
      </div>
    </div>

    <GalgamePrDetails v-if="details" :details="details" :refresh="refresh" />
  </div>
</template>
