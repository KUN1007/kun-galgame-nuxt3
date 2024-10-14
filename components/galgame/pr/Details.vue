<script setup lang="ts">
import DOMPurify from 'isomorphic-dompurify'
import { diffGalgame } from './compare'
import type { GalgamePRDetails } from '~/types/api/galgame-pr'
import type { GalgameDetail } from '~/types/api/galgame'

const props = defineProps<{
  details: Partial<GalgamePRDetails>
  refresh: () => void
}>()
const galgame = inject<GalgameDetail>('galgame')

const { uid, roles } = usePersistUserStore()
const isShowButton = computed(() => galgame?.user.uid === uid || roles >= 2)
const isFetching = ref(false)
const isShowReasonInput = ref(false)
const declineInput = ref('')

const diff = computed(() => {
  if (!galgame || !props.details.galgame) {
    return []
  }
  return diffGalgame(galgame, props.details.galgame)
})

const handleDeclineRequest = async () => {
  if (!declineInput.value.trim() || declineInput.value.trim().length > 1007) {
    useMessage(10543, 'warn')
    return
  }
  const res = await useComponentMessageStore().alert(
    {
      'en-us': 'Are you sure you want to decline the update request?',
      'ja-jp': '更新リクエストを拒否してもよろしいですか？',
      'zh-cn': '您确定拒绝更新请求吗？',
      'zh-tw': '您確定拒絕更新請求嗎？'
    },
    {
      'en-us':
        'This action will not merge this update into the current visualnovel information',
      'ja-jp':
        'この操作では、この更新は現在のギャルゲーム情報にマージされません。',
      'zh-cn': '这将不会将该更新合并至当前的 Galgame 信息中。',
      'zh-tw': '這將不會將該更新合併至當前的 Galgame 信息中。'
    }
  )
  if (!res) {
    return
  }

  isFetching.value = true
  const result = await $fetch(`/api/galgame/${props.details.gid}/pr/decline`, {
    method: 'PUT',
    body: { gprid: props.details.gprid, note: declineInput.value.trim() },
    watch: false,
    ...kungalgameResponseHandler
  })
  isFetching.value = false

  if (result) {
    useMessage(10544, 'success')
    props.refresh()
  }
}

const handleMergeRequest = async () => {
  const res = await useComponentMessageStore().alert(
    {
      'en-us': 'Are you sure you want to merge the update request?',
      'ja-jp': '更新リクエストをマージしてもよろしいですか？',
      'zh-cn': '您确定合并更新请求吗？',
      'zh-tw': '您確定合併更新請求嗎？'
    },
    {
      'en-us':
        'This will immediately merge the content from the update request into the current visualnovel',
      'ja-jp':
        'これにより、更新リクエストの内容が直ちに現在のギャルゲームにマージされます。',
      'zh-cn': '这将会立即将更新请求中的内容合并到当前 Galgame 中。',
      'zh-tw': '這將會立即將更新請求中的內容合併到當前 Galgame 中。'
    }
  )
  if (!res) {
    return
  }

  isFetching.value = true
  const result = await $fetch(`/api/galgame/${props.details.gid}/pr/merge`, {
    method: 'PUT',
    body: { gprid: props.details.gprid },
    watch: false,
    ...kungalgameResponseHandler
  })
  isFetching.value = false

  if (result) {
    useMessage(10545, 'success')
    props.refresh()
  }
}
</script>

<template>
  <div class="details">
    <div class="diff">
      <div v-for="(kun, index) in diff" :key="index">
        <p class="name">{{ $t(`galgame.pr.i18n.${kun.name}`) }}</p>
        <div
          class="value"
          v-html="DOMPurify.sanitize(kun.value.replace(/\\/g, ''))"
        />
      </div>
    </div>

    <div class="btn" v-if="!details.status && isShowButton">
      <KunButton
        @click="isShowReasonInput = !isShowReasonInput"
        :pending="isFetching"
      >
        {{ $t('galgame.pr.decline') }}
      </KunButton>
      <KunButton @click="handleMergeRequest" :pending="isFetching">
        {{ $t('galgame.pr.merge') }}
      </KunButton>
    </div>
    <div class="hint" v-if="!details.status && !isShowButton">
      {{ $t('galgame.pr.hint') }}
    </div>

    <div class="decline-input" v-if="isShowReasonInput">
      <KunInput
        :placeholder="`${$t('galgame.pr.note')}`"
        v-model="declineInput"
      />
      <KunButton
        type="danger"
        @click="handleDeclineRequest"
        :pending="isFetching"
      >
        {{ $t('galgame.pr.confirm') }}
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

  :deep(i) {
    color: var(--kungalgame-green-4);
  }

  .name {
    margin-bottom: 7px;
    font-weight: bold;
  }

  .value {
    word-break: break-word;
    margin-bottom: 17px;
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
