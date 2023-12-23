<script setup lang="ts">
import type { TopicComment } from '~/types/api/comment'

const { name } = storeToRefs(useKUNGalgameUserStore())
const { tid, rid, toUid, toUsername, content, isShowCommentPanelRid } =
  storeToRefs(useTempCommentStore())

// Define parent component emits
const emits = defineEmits<{
  getCommentEmits: [newComment: TopicComment]
}>()

// Comment content
const commentValue = ref('')

// Handle comment input
const handleInputComment = () => {
  // Create a debounced processing function
  const debouncedUpdateContent = debounce(() => {
    content.value = commentValue.value
  }, 300)

  // Call the debounced processing function
  // which will execute the update operation only once within the specified delay
  debouncedUpdateContent()
}

// Check if the comment is valid
const isValidComment = () => {
  // Warning if comment content is empty
  if (!content.value.trim()) {
    useMessage('Comment content cannot be empty!', '评论内容不能为空！', 'warn')
    return false
  }

  // Warning if comment content exceeds the limit
  if (content.value.trim().length > 1007) {
    useMessage(
      'The maximum length for comments should not exceed 1007 characters.',
      '评论最大长度不可超过 1007 个字符',
      'warn'
    )
    return false
  }

  return true
}

// Publish a comment
const handlePublishComment = async () => {
  if (isValidComment()) {
    // Get the new comment
    // const newComment = (
    //   await useTempCommentStore().postNewComment(
    //     tid.value,
    //     rid.value,
    //     toUid.value,
    //     content.value
    //   )
    // ).data

    // // Pass the new comment content to the parent component
    // emits('getCommentEmits', newComment)

    // Inform the user
    useMessage('Comment published successfully!', '评论发布成功', 'success')

    handleCloseCommentPanel()
  }
}

// Close the comment panel
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
    <!-- Textarea container -->
    <div class="container">
      <textarea
        name="comment"
        :placeholder="`${$t('topic.content.hint')}`"
        rows="5"
        v-model="commentValue"
        @input="handleInputComment"
      >
      </textarea>

      <!-- Text count -->
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
      color: var(--kungalgame-blue-4);

      &:hover {
        text-decoration: underline;
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
    transition: all 0.2s;
    color: var(--kungalgame-blue-4);
    padding: 2px 7px;
    border: 1px solid var(--kungalgame-blue-4);
    border-radius: 5px;
    background-color: var(--kungalgame-trans-white-5);

    &:hover {
      background-color: var(--kungalgame-blue-4);
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
    border: 1px solid var(--kungalgame-blue-4);
    background-color: var(--kungalgame-trans-white-9);
    border-radius: 5px;
    padding: 5px;

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
