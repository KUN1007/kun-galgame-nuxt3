<script setup lang="ts">
import { checkReplyPublish } from '../utils/checkReplyPublish'
import type { TopicCreateReplyRequestData } from '~/types/api/reply'

const { isShowAdvance } = storeToRefs(usePersistKUNGalgameTopicStore())
const { isReplyRewriting, replyRewrite } = storeToRefs(useTempReplyStore())
const { isSaveReply, replyDraft } = storeToRefs(
  usePersistKUNGalgameReplyStore()
)

const { isEdit, tempReplyRewrite } = storeToRefs(useTempReplyStore())

const messageStore = useTempMessageStore()

const handlePublish = async () => {
  const requestData: TopicCreateReplyRequestData = {
    to_uid: replyDraft.value.toUid.toString(),
    to_floor: replyDraft.value.toFloor.toString(),
    tags: replyDraft.value.tags,
    content: replyDraft.value.content,
    time: Date.now().toString(),
  }
  if (!checkReplyPublish(requestData.tags, requestData.content)) {
    return
  }

  const res = await messageStore.alert('AlertInfo.edit.publish', true)
  if (!res) {
    return
  }
  useTempReplyStore().resetPageStatus()

  const { data } = await useFetch(`/api/topic/${replyDraft.value.tid}/reply`, {
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
    useTempReplyStore().tempReply = data.value
    usePersistKUNGalgameReplyStore().resetReplyDraft()

    isEdit.value = false
    useMessage('Publish reply successfully!', '发布回复成功！', 'success')
  }
}

const saveRewriteReply = () => {
  tempReplyRewrite.value.rid = replyRewrite.value.rid
  tempReplyRewrite.value.content = replyRewrite.value.content
  tempReplyRewrite.value.tags = replyRewrite.value.tags
  tempReplyRewrite.value.edited = Date.now()
}

const handleRewrite = async () => {
  const res = await messageStore.alert('AlertInfo.edit.rewrite', true)

  if (res) {
    // const responseData = await useTempReplyStore().updateReply()
    // if (responseData?.code === 200) {
    //   useMessage('Reply rewrite successfully', '回复重新编辑成功', 'success')
    //   saveRewriteReply()
    //   useTempReplyStore().resetRewriteReplyData()
    //   isShowAdvance.value = false
    //   isEdit.value = false
    // }
  }
}

const handleSave = () => {
  isSaveReply.value = true
  useMessage(
    'The draft has been saved successfully!',
    '草稿已经保存成功',
    'success'
  )
}

const handleShowAdvance = () => {
  isShowAdvance.value = !isShowAdvance.value
}
</script>

<template>
  <div class="btn-container">
    <button class="advance-btn" @click="handleShowAdvance">
      {{ $t('topic.panel.advance') }}
    </button>

    <button v-if="!isReplyRewriting" class="confirm-btn" @click="handlePublish">
      {{ $t('topic.panel.confirm') }}
    </button>

    <button v-if="isReplyRewriting" class="rewrite-btn" @click="handleRewrite">
      {{ $t('topic.panel.rewrite') }}
    </button>

    <button v-if="!isReplyRewriting" class="save-btn" @click="handleSave">
      {{ $t('topic.panel.save') }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
.btn-container {
  padding: 10px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

.btn-container button {
  margin: 10px 0;
  height: 40px;
  width: 150px;
  font-size: 17px;
  white-space: nowrap;
  border-radius: 5px;
  overflow: hidden;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.2s;
  &:hover {
    color: var(--kungalgame-white);
  }
}

.confirm-btn {
  color: var(--kungalgame-blue-4);
  background-color: var(--kungalgame-trans-white-9);
  border: 1px solid var(--kungalgame-blue-4);

  &:hover {
    background-color: var(--kungalgame-blue-4);
    transition: 0.1s;
  }

  &:active {
    background-color: var(--kungalgame-blue-3);
    transform: scale(0.8);
  }
}

.rewrite-btn {
  color: var(--kungalgame-red-4);
  background-color: var(--kungalgame-trans-white-9);
  border: 1px solid var(--kungalgame-red-4);

  &:hover {
    background-color: var(--kungalgame-red-4);
    transition: 0.1s;
  }

  &:active {
    background-color: var(--kungalgame-red-3);
    transform: scale(0.8);
  }
}

.save-btn {
  color: var(--kungalgame-pink-4);
  background-color: var(--kungalgame-trans-white-9);
  border: 1px solid var(--kungalgame-pink-4);

  &:hover {
    background-color: var(--kungalgame-pink-4);
    transition: 0.1s;
  }

  &:active {
    background-color: var(--kungalgame-pink-3);
    transform: scale(0.8);
  }
}

.advance-btn {
  color: var(--kungalgame-purple-4);
  background-color: var(--kungalgame-trans-white-9);
  border: 1px solid var(--kungalgame-purple-4);

  &:hover {
    background-color: var(--kungalgame-purple-4);
    transition: 0.1s;
  }

  &:active {
    background-color: var(--kungalgame-purple-4);
    transform: scale(0.8);
  }
}

@media (max-width: 700px) {
  .advance-btn {
    display: none;
  }
}
</style>
