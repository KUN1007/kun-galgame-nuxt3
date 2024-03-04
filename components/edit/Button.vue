<script setup lang="ts">
import { checkTopicPublish } from './utils/checkTopicPublish'
import type {
  EditCreateTopicRequestData,
  EditUpdateTopicRequestData
} from '~/types/api/topic'

const localePath = useLocalePath()

const {
  tid,
  title: rewriteTitle,
  content: rewriteContent,
  tags: rewriteTags,
  category: rewriteCategory,
  textCount: rewriteTextCount,
  isTopicRewriting
} = storeToRefs(useTempEditStore())

const { textCount, title, content, tags, category } = storeToRefs(
  useKUNGalgameEditStore()
)
const { clearTopic } = storeToRefs(useTempEditStore())

const messageStore = useTempMessageStore()
const isPublishing = ref(false)

const handleClear = async () => {
  const res = await messageStore.alert('AlertInfo.edit.clear', true)
  if (!res) {
    return
  }
  useKUNGalgameEditStore().resetTopicData()
  clearTopic.value = !clearTopic.value
  useMessage('Clearing content successful', '清空内容成功', 'success')
}

const handlePublish = async () => {
  const requestData: EditCreateTopicRequestData = {
    title: title.value,
    content: content.value,
    time: Date.now().toString(),
    tags: tags.value,
    category: category.value
  }
  if (!checkTopicPublish(textCount.value, requestData)) {
    return
  }

  const res = await messageStore.alert('AlertInfo.edit.publish', true)
  if (!res) {
    return
  }

  if (isPublishing.value) {
    return
  } else {
    isPublishing.value = true
    useMessage('Publishing...', '正在发布...', 'info')
  }
  const { data } = await useFetch('/api/topic/create', {
    method: 'POST',
    body: requestData,
    watch: false,
    ...kungalgameResponseHandler
  })
  isPublishing.value = false

  if (data.value) {
    const tid = data.value
    navigateTo(localePath(`/topic/${tid}`))
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
    edited: Date.now().toString()
  }
  if (!checkTopicPublish(rewriteTextCount.value, requestData)) {
    return
  }

  const res = await messageStore.alert('AlertInfo.edit.rewrite', true)
  if (!res) {
    return
  }

  if (isPublishing.value) {
    return
  } else {
    isPublishing.value = true
    useMessage('Publishing...', '正在发布...', 'info')
  }
  const { data } = await useFetch(`/api/topic/${tid.value}`, {
    method: 'PUT',
    body: requestData,
    watch: false,
    ...kungalgameResponseHandler
  })
  isPublishing.value = false

  if (data.value) {
    navigateTo(localePath(`/topic/${tid.value}`))
    messageStore.info('AlertInfo.edit.rewriteSuccess')
    useTempEditStore().resetRewriteTopicData()
  }
}
</script>

<template>
  <div class="btn-container">
    <button v-if="!isTopicRewriting" class="clear-btn" @click="handleClear">
      {{ $t('edit.clear') }}
    </button>

    <button
      v-if="!isTopicRewriting"
      class="confirm-btn"
      @click="handlePublish"
      :disabled="isPublishing"
    >
      {{ $t('edit.publish') }}
    </button>

    <button v-if="isTopicRewriting" class="rewrite-btn" @click="handleRewrite">
      {{ $t('edit.rewrite') }}
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
  color: var(--kungalgame-blue-5);
  background-color: var(--kungalgame-trans-white-9);
  border: 1px solid var(--kungalgame-blue-5);

  &:hover {
    background-color: var(--kungalgame-blue-5);
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

.clear-btn {
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
