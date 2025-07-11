<script setup lang="ts">
import DOMPurify from 'isomorphic-dompurify'
import { diffGalgame } from './compare'
import { KUN_GALGAME_RESOURCE_PULL_REQUEST_I18N_FIELD_MAP } from '~/constants/galgame'
import type { GalgamePRDetails } from '~/types/api/galgame-pr'
import type { GalgameDetail } from '~/types/api/galgame'

const props = defineProps<{
  details: Partial<GalgamePRDetails>
  refresh: () => void
}>()
const galgame = inject<GalgameDetail>('galgame')

const { id, role } = usePersistUserStore()
const isShowButton = computed(() => galgame?.user.id === id || role >= 2)
const isFetching = ref(false)
const isShowReasonInput = ref(false)
const declineInput = ref('')

const diff = computed(() => {
  return diffGalgame(toRaw(props.details.oldData), toRaw(props.details.newData))
})

const handleDeclineRequest = async () => {
  if (!declineInput.value.trim() || declineInput.value.trim().length > 1007) {
    useMessage(10543, 'warn')
    return
  }
  const res = await useComponentMessageStore().alert(
    '您确定拒绝更新请求吗？',
    '这将不会将该更新合并至当前的 Galgame 信息中。'
  )
  if (!res) {
    return
  }

  isFetching.value = true
  const result = await $fetch(
    `/api/galgame/${props.details.galgameId}/pr/decline`,
    {
      method: 'PUT',
      body: { galgamePrId: props.details.id, note: declineInput.value.trim() },
      watch: false,
      ...kungalgameResponseHandler
    }
  )
  isFetching.value = false

  if (result) {
    useMessage(10544, 'success')
    props.refresh()
  }
}

const handleMergeRequest = async () => {
  const res = await useComponentMessageStore().alert(
    '您确定合并更新请求吗？',
    '这将会立即将更新请求中的内容合并到当前 Galgame 中。'
  )
  if (!res) {
    return
  }

  isFetching.value = true
  const result = await $fetch(
    `/api/galgame/${props.details.galgameId}/pr/merge`,
    {
      method: 'PUT',
      body: { galgamePrId: props.details.id },
      watch: false,
      ...kungalgameResponseHandler
    }
  )
  isFetching.value = false

  if (result) {
    useMessage(10545, 'success')
    props.refresh()
  }
}
</script>

<template>
  <div class="space-y-3">
    <div class="diff">
      <div v-for="(kun, index) in diff" :key="index">
        <p class="mb-2 font-bold">
          {{ KUN_GALGAME_RESOURCE_PULL_REQUEST_I18N_FIELD_MAP[kun.name] }}
        </p>
        <div
          class="break-word mb-4"
          v-html="DOMPurify.sanitize(kun.value.replace(/\\/g, ''))"
        />
      </div>
    </div>

    <div
      class="flex items-center justify-end gap-1"
      v-if="!details.status && isShowButton"
    >
      <KunButton
        variant="light"
        color="danger"
        @click="isShowReasonInput = !isShowReasonInput"
        :loading="isFetching"
      >
        拒绝
      </KunButton>
      <KunButton @click="handleMergeRequest" :loading="isFetching">
        合并
      </KunButton>
    </div>

    <div
      class="text-default-500 text-sm"
      v-if="!details.status && !isShowButton"
    >
      要处理该请求, 需要资源的发布者、或管理员
    </div>

    <div class="flex items-center gap-1" v-if="isShowReasonInput">
      <KunInput placeholder="请填写拒绝更新请求的理由" v-model="declineInput" />
      <KunButton
        color="danger"
        @click="handleDeclineRequest"
        :loading="isFetching"
        class-name="shrink-0"
      >
        确定拒绝
      </KunButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.diff {
  :deep(h2) {
    margin-bottom: 10px;
  }

  :deep(strong) {
    color: var(--color-danger);
    background-color: color-mix(in oklab, var(--color-danger) 20%, transparent);
  }

  :deep(b) {
    color: var(--color-primary);
    background-color: color-mix(
      in oklab,
      var(--color-primary) 20%,
      transparent
    );
  }

  :deep(i) {
    color: var(--color-success);
    background-color: color-mix(
      in oklab,
      var(--color-success) 20%,
      transparent
    );
  }
}
</style>
