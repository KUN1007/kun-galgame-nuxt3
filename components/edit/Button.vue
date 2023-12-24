<script setup lang="ts">
import { checkTopicPublish } from './utils/checkTopicPublish'
import type {
  EditCreateTopicRequestData,
  EditUpdateTopicRequestData,
} from '~/types/api/topic'

const router = useRouter()

const {
  tid,
  title: rewriteTitle,
  content: rewriteContent,
  tags: rewriteTags,
  category: rewriteCategory,
  textCount: rewriteTextCount,
  isTopicRewriting,
} = storeToRefs(useTempEditStore())

const { textCount, title, content, tags, category, isSaveTopic } = storeToRefs(
  useKUNGalgameEditStore()
)
const messageStore = useTempMessageStore()

const handlePublish = async () => {
  const requestData: EditCreateTopicRequestData = {
    title: title.value,
    content: content.value,
    time: Date.now(),
    tags: tags.value,
    category: category.value,
  }
  if (!checkTopicPublish(textCount.value, requestData)) {
    return
  }

  const res = await messageStore.alert('AlertInfo.edit.publish', true)
  if (!res) {
    return
  }

  const { data } = await useFetch('/api/topic/create', {
    method: 'POST',
    body: requestData,
    watch: false,
    onResponse({ request, response, options }) {
      if (response.status === 233) {
        kungalgameErrorHandler(response.statusText)
        return
      }
    },
  })

  if (data.value) {
    const tid = data.value
    router.push(`/topic/${tid}`)
    messageStore.info('AlertInfo.edit.publishSuccess')
    useKUNGalgameEditStore().resetTopicData()
  }
}

const handleRewrite = async () => {
  const requestData: EditUpdateTopicRequestData = {
    tid: tid.value,
    title: rewriteTitle.value,
    content: rewriteContent.value,
    tags: rewriteTags.value,
    category: rewriteCategory.value,
    edited: Date.now(),
  }
  if (!checkTopicPublish(rewriteTextCount.value, requestData)) {
    return
  }

  const res = await messageStore.alert('AlertInfo.edit.rewrite', true)
  if (!res) {
    return
  }

  const { data } = await useFetch(`/api/topic/${tid.value}`, {
    method: 'PUT',
    body: requestData,
    watch: false,
    onResponse({ request, response, options }) {
      if (response.status === 233) {
        kungalgameErrorHandler(response.statusText)
        return
      }
    },
  })

  if (data.value) {
    router.push(`/topic/${tid.value}`)
    messageStore.info('AlertInfo.edit.rewriteSuccess')
    useTempEditStore().resetRewriteTopicData()
  }
}

const handleSave = () => {
  isSaveTopic.value = true
  messageStore.info('AlertInfo.edit.draft')
}
</script>

<template>
  <div class="btn-container">
    <button v-if="!isTopicRewriting" class="confirm-btn" @click="handlePublish">
      {{ $t('edit.publish') }}
    </button>

    <button v-if="isTopicRewriting" class="rewrite-btn" @click="handleRewrite">
      {{ $t('edit.rewrite') }}
    </button>

    <button v-if="!isTopicRewriting" class="save-btn" @click="handleSave">
      {{ $t('edit.draft') }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
.btn-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  button {
    transition: all 0.2s;
    height: 40px;
    width: 200px;
    font-size: 20px;
    white-space: nowrap;
    overflow: hidden;
    cursor: pointer;
    flex-shrink: 0;
    border-radius: 5px;

    &:hover {
      color: var(--kungalgame-white);
    }
  }
}

.confirm-btn {
  color: var(--kungalgame-blue-4);
  background-color: var(--kungalgame-trans-white-9);
  border: 1px solid var(--kungalgame-blue-4);

  &:hover {
    background-color: var(--kungalgame-blue-4);
    transition: 0.2s;
  }
}

.rewrite-btn {
  color: var(--kungalgame-red-4);
  background-color: var(--kungalgame-trans-white-9);
  border: 1px solid var(--kungalgame-red-4);

  &:hover {
    background-color: var(--kungalgame-red-4);
    transition: 0.2s;
  }
}

.save-btn {
  color: var(--kungalgame-pink-4);
  background-color: var(--kungalgame-trans-white-9);
  border: 1px solid var(--kungalgame-pink-4);

  &:hover {
    background-color: var(--kungalgame-pink-4);
    transition: 0.2s;
  }

  &:active {
    background-color: var(--kungalgame-pink-3);
    transform: scale(0.8);
  }
}

@media (max-width: 700px) {
  .btn-container button {
    width: 150px;
    font-size: 17px;
  }
}
</style>
