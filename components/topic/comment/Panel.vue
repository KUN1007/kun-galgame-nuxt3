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
    useMessage(10221, 'warn')
    return
  }

  if (commentValue.value.trim().length > 1007) {
    useMessage(10222, 'warn')
    return
  }

  if (isPublishing.value) {
    return
  } else {
    isPublishing.value = true
    useMessage(10223, 'info')
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
    useMessage(10224, 'success')
    isShowPanel.value = false
  }
}
</script>

<template>
  <div class="panel">
    <div class="top">
      <div class="title">
        <span>{{ name }}</span>
        <span>评论</span>
        <span>{{ toUsername }}</span>
      </div>
      <div class="confirm">
        <KunButton @click="handlePublishComment">发布评论</KunButton>
        <KunButton @click="isShowPanel = false">关闭</KunButton>
      </div>
    </div>

    <KunTextarea
      name="comment"
      placeholder="请输入您的评论, 最大字数为1007"
      rows="5"
      v-model="commentValue"
    />
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
      border-bottom: 2px solid transparent;

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

  .kun-button {
    &:first-child {
      margin-right: 8px;
    }
  }
}
</style>
