<script setup lang="ts">
import type { TopicComment } from '~/types/api/topic-comment'

const props = defineProps<{
  rid: number
  commentsData: TopicComment[]
}>()

const comments = ref(props.commentsData)

const currentUserUid = usePersistUserStore().uid
const {
  rid: storeRid,
  toUid,
  toUsername,
  isShowPanel
} = storeToRefs(useTempCommentStore())

const handleClickComment = (comment: TopicComment) => {
  if (!currentUserUid) {
    useMessage(10216, 'warn', 5000)
    return
  }

  storeRid.value = props.rid
  toUid.value = comment.user.uid
  toUsername.value = comment.user.name
  isShowPanel.value = !isShowPanel.value
}
</script>

<template>
  <div v-if="comments?.length" class="bg-default-100 rounded-lg p-6">
    <h3 class="mb-4 text-lg font-semibold text-gray-900">评论</h3>

    <div class="space-y-4">
      <div
        v-for="(comment, index) in comments"
        :key="index"
        class="flex items-start space-x-3"
      >
        <NuxtLink
          v-if="comment.user.avatar"
          :to="`/kungalgamer/${comment.user.uid}/info`"
          class="flex-shrink-0"
        >
          <img
            :src="comment.user.avatar.replace(/\.webp$/, '-100.webp')"
            alt="KUN"
            class="h-8 w-8 rounded-full"
          />
        </NuxtLink>

        <div class="min-w-0 flex-1">
          <div class="flex items-center justify-between">
            <div class="text-sm">
              <span class="text-gray-900">{{ comment.user.name }}</span>
              <span class="mx-1 text-gray-500">评论</span>
              <NuxtLink
                :to="`/kungalgamer/${comment.toUser.uid}/info`"
                class="text-primary-600 hover:text-primary-700"
              >
                {{ comment.toUser.name }}
              </NuxtLink>
            </div>

            <div class="flex items-center space-x-2">
              <TopicCommentLike :comment="comment" />
              <button
                @click="handleClickComment(comment)"
                class="text-gray-500 transition-colors hover:text-gray-700"
              >
                <Icon name="uil:comment-dots" class="h-5 w-5" />
              </button>
            </div>
          </div>

          <p class="mt-1 text-sm whitespace-pre-wrap text-gray-700">
            {{ comment.content }}
          </p>
        </div>
      </div>
    </div>

    <LazyTopicCommentPanel
      v-if="isShowPanel && rid === storeRid"
      :rid="rid"
      @get-comment="(newComment) => comments.push(newComment)"
    />
  </div>
</template>
