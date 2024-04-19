<script setup lang="ts">
import type { TopicComment } from '~/types/api/topic-comment'

const props = defineProps<{
  rid: number
}>()

const emits = defineEmits<{
  getComment: [newComment: TopicComment]
}>()

const { name } = usePersistUserStore()
const { toUid, toUsername, isShowPanel } = storeToRefs(useTempCommentStore())
const tid = inject<number>('tid')
const commentValue = ref('')
const isPublishing = ref(false)

const handlePublishComment = async () => {
  if (!commentValue.value.trim()) {
    useMessage('Comment content cannot be empty!', '评论内容不能为空！', 'warn')
    return
  }

  if (commentValue.value.trim().length > 1007) {
    useMessage(
      'The maximum length for comments should not exceed 1007 characters.',
      '评论最大长度不可超过 1007 个字符',
      'warn'
    )
    return
  }

  if (isPublishing.value) {
    return
  } else {
    isPublishing.value = true
    useMessage('Publishing...', '正在发布...', 'info')
  }
  const comment = await $fetch(`/api/topic/${tid}/comment`, {
    method: 'POST',
    body: {
      rid: props.rid,
      toUid: toUid.value,
      content: commentValue.value
    },
    watch: false,
    ...kungalgameResponseHandler
  })
  isPublishing.value = false

  if (comment) {
    emits('getComment', comment)
    useMessage('Comment published successfully!', '评论发布成功', 'success')
    isShowPanel.value = false
  }
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
        <button @click="isShowPanel = false">
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
