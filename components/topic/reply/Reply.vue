<script setup lang="ts">
import { scrollPage } from '../_helper'
import type { TopicReply } from '~/types/api/topic-reply'

const { scrollToReplyId } = storeToRefs(useTempReplyStore())
const { replyId: storeReplyId, isShowPanel } = storeToRefs(
  useTempCommentStore()
)

const props = defineProps<{
  reply: TopicReply
  title: string
}>()

const comments = ref(props.reply.comment)

watch(
  () => scrollToReplyId.value,
  async () => {
    if (scrollToReplyId.value !== -1) {
      await nextTick()
      scrollPage(scrollToReplyId.value)
      scrollToReplyId.value = -1
    }
  }
)
</script>

<template>
  <div
    class="outline-primary kun-reply flex justify-between gap-3 rounded-lg outline-offset-2"
    :id="`k${reply.floor}`"
  >
    <TopicDetailUser :user="reply.user" />

    <KunCard
      :is-transparent="false"
      :is-hoverable="false"
      class-name="w-full"
      content-class="gap-3"
    >
      <TopicDetailUserMobile :user="reply.user" />

      <div class="flex items-center justify-between space-x-2 text-sm">
        <div class="text-default-500">
          <span>
            {{
              formatDate(reply.created, { isShowYear: true, isPrecise: true })
            }}
          </span>
          <span v-if="reply.edited" class="ml-2">
            (已编辑于
            {{
              formatDate(reply.edited, { isShowYear: true, isPrecise: true })
            }})
          </span>
        </div>
        <KunLink
          color="default"
          underline="none"
          :to="`/topic/${reply.topicId}#k${reply.floor}`"
          class-name="text-default-500 font-bold"
        >
          #{{ reply.floor }}
        </KunLink>
      </div>

      <div
        v-if="reply.targets && reply.targets.length > 0"
        class="flex flex-col gap-3"
      >
        <div
          v-for="target in reply.targets"
          :key="target.id"
          class="bg-default-100/50 rounded-lg p-3"
        >
          <blockquote class="border-primary/50 border-l-4 pl-4">
            <div class="mb-2 flex items-center gap-2 text-sm">
              <span>回复</span>
              <NuxtLink
                :to="`/user/${target.user.id}/info`"
                class="text-primary font-bold"
              >
                @{{ target.user.name }}
              </NuxtLink>
              <a
                :href="`#k${target.floor}`"
                @click.prevent="scrollPage(target.floor)"
                class="text-primary hover:underline"
              >
                #{{ target.floor }}
              </a>
            </div>
            <p class="text-default-600 line-clamp-3 text-sm italic">
              {{ target.contentPreview }}
            </p>
          </blockquote>

          <KunContent :content="target.replyContentHtml" class="mt-2" />
        </div>
      </div>

      <KunContent
        v-if="reply.contentMarkdown.trim()"
        :content="reply.contentHtml"
      />

      <TopicReplyFooter :reply="reply" :title="title" />

      <TopicComment :reply-id="reply.id" :comments-data="comments" />

      <LazyTopicCommentPanel
        v-if="isShowPanel && reply.id === storeReplyId"
        :reply-id="reply.id"
        @get-comment="(newComment) => comments.push(newComment)"
      />
    </KunCard>
  </div>
</template>
