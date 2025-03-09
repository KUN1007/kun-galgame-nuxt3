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
  <div class="flex justify-between gap-3" :id="`k${reply.floor}`">
    <TopicDetailUser :user="reply.user" />

    <KunCard class-name="w-full" content-class="gap-3" :is-hoverable="false">
      <div class="flex items-center justify-between space-x-2">
        <button
          @click="scrollToReplyId = reply.toFloor"
          class="text-primary cursor-pointer"
        >
          <span class="text-gray-500">回复给</span>
          {{ reply.toUser.name }}
        </button>

        <NuxtLink
          :to="`/topic/${reply.tid}#k${reply.floor}`"
          class="text-gray-400 hover:text-gray-600"
        >
          #{{ reply.floor }}
        </NuxtLink>
      </div>

      <KunContent :content="reply.content" />

      <div class="text-default-500 flex items-center justify-between text-sm">
        <span>
          {{ formatDate(reply.time, { isShowYear: true, isPrecise: true }) }}
        </span>
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

      <TopicReplyFooter :reply="reply" :title="title" />

      <TopicComment :rid="reply.rid" :comments-data="reply.comment" />
    </KunCard>
  </div>
</template>
