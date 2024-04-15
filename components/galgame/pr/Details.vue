<script setup lang="ts">
import DOMPurify from 'dompurify'
import { diffGalgame } from './compare'
import type { GalgamePRDetails } from '~/types/api/galgame-pr'
import type { GalgameDetail } from '~/types/api/galgame'

const props = defineProps<{
  details: Partial<GalgamePRDetails>
  refresh: () => {}
}>()
const { uid, moemoepoint, roles } = usePersistUserStore()
const isShowButton = computed(
  () => props.details.user?.uid === uid || moemoepoint >= 1100 || roles >= 2
)
const galgame = inject<GalgameDetail>('galgame')
const isFetching = ref(false)
const isShowReasonInput = ref(false)
const declineInput = ref('')

const diff = computed(() => {
  if (!galgame || !props.details.galgame) {
    return ''
  }
  return DOMPurify.sanitize(diffGalgame(galgame, props.details.galgame))
})

const handleDeclineMerge = async () => {
  if (!declineInput.value.trim() || declineInput.value.trim().length > 1007) {
    useMessage(
      'You must provide a reason for rejection, which should not exceed 1007 characters!',
      '您必须填写拒绝原因, 拒绝原因不多于 1007 字!',
      'warn'
    )
    return
  }
  const res = await useTempMessageStore().alert(
    {
      'en-us': 'Are you sure you want to decline the update request?',
      'ja-jp': '',
      'zh-cn': '您确定拒绝更新请求吗？'
    },
    {
      'en-us':
        'This action will not merge this update into the current visualnovel information.',
      'ja-jp': '',
      'zh-cn': '这将不会将该更新合并至当前的 Galgame 信息中'
    }
  )
  if (!res) {
    return
  }

  isFetching.value = true
  const { data } = await useFetch(
    `/api/galgame/${props.details.gid}/pr/decline`,
    {
      method: 'PUT',
      body: { gprid: props.details.gprid, note: declineInput.value.trim() },
      watch: false,
      ...kungalgameResponseHandler
    }
  )
  isFetching.value = false

  if (data.value) {
    props.refresh()
  }
}
</script>

<template>
  <div class="details">
    <div class="diff">
      <div v-html="diff"></div>
    </div>

    <div class="btn" v-if="isShowButton">
      <KunButton @click="isShowReasonInput = !isShowReasonInput">
        拒绝
      </KunButton>
      <KunButton>合并</KunButton>
    </div>
    <p class="hint" v-if="!isShowButton">
      要处理该请求, 需要资源的发布者、萌萌点大于 1100 的用户、或管理员
    </p>

    <div class="decline-input" v-if="isShowReasonInput">
      <KunInput placeholder="请填写拒绝原因" v-model="declineInput" />
      <KunButton
        type="danger"
        @click="handleDeclineMerge"
        :pending="isFetching"
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
    color: var(--kungalgame-red-5);
    background-color: var(--kungalgame-trans-pink-1);
  }

  :deep(b) {
    color: var(--kungalgame-blue-5);
    background-color: var(--kungalgame-trans-blue-1);
  }
}

.btn {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 17px;
  margin-left: auto;

  .kun-button {
    &:first-child {
      margin-right: 17px;
    }
  }
}

.hint {
  font-size: small;
  color: var(--kungalgame-font-color-0);
  margin-bottom: 17px;
}

.decline-input {
  display: flex;
  align-items: center;
  margin-bottom: 17px;

  .kun-input {
    width: 100%;
    margin-right: 10px;
  }

  .kun-button {
    flex-shrink: 0;
  }
}
</style>
