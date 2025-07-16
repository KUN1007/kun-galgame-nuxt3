<script setup lang="ts">
import { scrollIntoComment } from './_scrollIntoComment'
import type { WebsiteComment } from '~/types/api/website'

const props = defineProps<{
  websiteId: number
}>()

const { data } = await useFetch(`/api/website/${props.websiteId}/comment`, {
  method: 'GET',
  watch: false,
  query: { websiteId: props.websiteId },
  ...kungalgameResponseHandler
})

const comments = ref<WebsiteComment[]>(data.value ? data.value : [])

const handlePublishSuccess = (newComment: WebsiteComment) => {
  comments.value = [newComment, ...comments.value]
  nextTick(() => scrollIntoComment(newComment.id))
}
</script>

<template>
  <KunCard
    :is-transparent="false"
    :is-hoverable="false"
    :is-pressable="false"
    class-name="p-6"
  >
    <h2 class="text-default-900 mb-6 text-2xl font-bold">用户评论</h2>

    <div class="mb-8">
      <WebsiteCommentPublish
        :website-id="websiteId"
        @set-new-comment="handlePublishSuccess"
      />
    </div>

    <div v-if="comments.length" class="space-y-6">
      <WebsiteCommentRender
        :comments="comments"
        :website-id="websiteId"
        @set-new-comment="handlePublishSuccess"
      />
    </div>
  </KunCard>
</template>
