<script setup lang="ts">
import { checkCommentPublish } from '../utils/checkCommentPublish'
import type { TopicComment } from '~/types/api/comment'

const { name } = storeToRefs(useKUNGalgameUserStore())
const { tid, rid, toUid, toUsername, content, isShowCommentPanelRid } =
  storeToRefs(useTempCommentStore())
const isPublishing = ref(false)

const emits = defineEmits<{
  getCommentEmits: [newComment: TopicComment]
}>()

const commentValue = ref('')

const handleInputComment = () => {
  const debouncedUpdateContent = debounce(() => {
    content.value = commentValue.value
  }, 300)
  debouncedUpdateContent()
}

const handlePublishComment = async () => {
  const requestData = {
    rid: rid.value,
    to_uid: toUid.value,
    content: content.value
  }
  if (!checkCommentPublish(requestData.content)) {
    return
  }

  if (isPublishing.value) {
    return
  } else {
    isPublishing.value = true
    useMessage('Publishing...', '正在发布...', 'info')
  }
  const { data } = await useFetch(`/api/topic/${tid.value}/comment`, {
    method: 'POST',
    body: requestData,
    watch: false,
    ...kungalgameResponseHandler
  })
  isPublishing.value = false

  if (data.value) {
    emits('getCommentEmits', data.value)
    useMessage('Comment published successfully!', '评论发布成功', 'success')
    handleCloseCommentPanel()

    const socket = useSocket()
    socket.emit('comment', toUid.value)
  }
}

const handleCloseCommentPanel = () => {
  isShowCommentPanelRid.value = 0
}
</script>

<template>
  <div class="panel">
    <div class="top">
      <div class="title">
        <span>{{ name }}</span>
        <span>{{ $t('topic.content.comment') }}</span>
        <span>{{ toUsername }}</span>
      </div>
      <div class="confirm">
        <button @click="handlePublishComment">
          {{ $t('topic.content.publish') }}
        </button>
        <button @click="handleCloseCommentPanel">
          {{ $t('topic.content.close') }}
        </button>
      </div>
    </div>

    <div class="container">
      <textarea
        name="comment"
        :placeholder="`${$t('topic.content.hint')}`"
        rows="5"
        v-model="commentValue"
        @input="handleInputComment"
      >
      </textarea>

      <div class="count">{{ commentValue.length }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.panel {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.top {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  color: var(--kungalgame-font-color-3);
  padding: 10px 0;
}

.title {
  display: flex;
  flex-wrap: wrap;

  span {
    padding-bottom: 5px;

    &:nth-child(2) {
      margin: 0 5px;
    }

    &:nth-child(3) {
      cursor: pointer;
      color: var(--kungalgame-blue-5);
      border-bottom: 2px solid var(--kungalgame-trans-white-9);

      &:hover {
        border-bottom: 2px solid var(--kungalgame-blue-5);
      }
    }
  }
}

.confirm {
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    cursor: pointer;
    color: var(--kungalgame-blue-5);
    padding: 5px 10px;
    border: 1px solid var(--kungalgame-blue-5);
    border-radius: 5px;
    background-color: var(--kungalgame-trans-white-9);

    &:hover {
      background-color: var(--kungalgame-blue-5);
      color: var(--kungalgame-white);
    }

    &:nth-child(2) {
      margin-left: 5px;
    }
  }
}

.container {
  position: relative;
  display: flex;

  textarea {
    color: var(--kungalgame-font-color-3);
    flex: 1;
    margin-bottom: 20px;
    width: 100%;
    border: 1px solid var(--kungalgame-blue-5);
    background-color: var(--kungalgame-trans-white-9);
    border-radius: 5px;
    padding: 5px;

    &::placeholder {
      color: var(--kungalgame-font-color-1);
    }

    &:focus {
      border: 1px solid var(--kungalgame-pink-3);
    }
  }
}

.count {
  position: absolute;
  bottom: 0;
  right: 0;
  color: var(--kungalgame-font-color-1);
}
</style>
