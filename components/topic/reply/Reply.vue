<script setup lang="ts">
import type { TopicReply } from '~/types/api/topic-reply'

const { scrollToReplyId } = storeToRefs(useTempReplyStore())

defineProps<{
  reply: TopicReply
  title: string
}>()

const emits = defineEmits<{
  scrollPage: [scrollToReplyId: number]
}>()

watch(
  () => scrollToReplyId.value,
  async () => {
    if (scrollToReplyId.value !== -1) {
      await nextTick()
      emits('scrollPage', scrollToReplyId.value)
      scrollToReplyId.value = -1
    }
  }
)
</script>

<template>
  <div
    :id="`k${reply.floor}`"
    :class="[
      'overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300',
      hourDiff(reply.upvoteTime, 10) ? 'ring-primary-500 ring-2' : ''
    ]"
  >
    <div class="p-6">
      <div class="flex items-start space-x-4">
        <div class="flex-shrink-0">
          <TopicDetailUser :user="reply.user" />
        </div>

        <div class="min-w-0 flex-1">
          <div class="mb-4 flex items-center space-x-2">
            <span class="text-gray-500">回复给 @</span>
            <button
              @click="scrollToReplyId = reply.toFloor"
              class="text-primary-600 hover:text-primary-700"
            >
              {{ reply.toUser.name }}
            </button>
          </div>

          <div class="prose max-w-none">
            <KunContent :content="reply.content" />
          </div>

          <div
            class="mt-4 flex items-center justify-between text-sm text-gray-500"
          >
            <div class="flex items-center space-x-4">
              <TopicTags :tags="reply.tags" />
              <time>
                {{
                  formatDate(reply.time, { isShowYear: true, isPrecise: true })
                }}
              </time>
              <span v-if="reply.edited" class="text-gray-400">
                (已编辑于
                {{
                  formatDate(reply.edited, {
                    isShowYear: true,
                    isPrecise: true
                  })
                }})
              </span>
            </div>
            <div class="text-lg font-semibold">
              <NuxtLink
                :to="`/topic/${reply.tid}#k${reply.floor}`"
                class="text-gray-400 hover:text-gray-600"
              >
                #{{ reply.floor }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="border-t border-gray-200 bg-gray-50 px-6 py-4">
      <TopicReplyFooter :reply="reply" :title="title" />
    </div>

    <TopicComment
      :rid="reply.rid"
      :comments-data="reply.comment"
      class="border-t border-gray-200"
    />
  </div>
</template>
