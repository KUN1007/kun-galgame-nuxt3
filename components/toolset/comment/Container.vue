<script setup lang="ts">
import type { ToolsetComment } from '~/types/api/toolset-comment'
import type { SerializeObject } from 'nitropack'

const props = defineProps<{ toolsetId: number; ownerId?: number }>()

const pageData = reactive({
  toolsetId: props.toolsetId,
  page: 1,
  limit: 30,
  sortOrder: 'desc'
})

const { data, status, refresh } = await useLazyFetch(
  `/api/toolset/${props.toolsetId}/comment/all`,
  {
    method: 'GET',
    query: pageData,
    ...kungalgameResponseHandler
  }
)

const addNewComment = (comment: ToolsetComment) => {
  if (!data.value) {
    return
  }
  data.value.commentData.unshift(comment as SerializeObject<ToolsetComment>)
}

const removeComment = (commentId: number) => {
  if (!data.value) {
    return
  }
  data.value.commentData = data.value.commentData.filter(
    (c) => c.id !== commentId
  )
}

const updateComment = (commentId: number, content: string, edited: string) => {
  if (!data.value) return
  const target = data.value.commentData.find((c) => c.id === commentId)
  if (target) {
    target.content = content
    target.edited = edited
  }
}
</script>

<template>
  <div class="space-y-3">
    <KunHeader
      name="评论"
      description="如果您对该工具有任何的使用疑问, 欢迎发布评论"
      scale="h2"
    />

    <ToolsetCommentPublish
      :toolset-id="toolsetId"
      @set-new-comment="addNewComment"
    />

    <KunLoading v-if="status === 'pending'" />

    <KunNull v-if="data && data.totalCount === 0 && status !== 'pending'" />

    <div
      class="space-y-3"
      v-if="data && data.totalCount > 0 && status !== 'pending'"
    >
      <div class="flex items-center gap-2">
        <KunButton
          :is-icon-only="true"
          :variant="pageData.sortOrder === 'desc' ? 'flat' : 'light'"
          size="lg"
          @click="pageData.sortOrder = 'desc'"
        >
          <KunIcon class="text-inherit" name="lucide:arrow-down" />
        </KunButton>

        <KunButton
          :is-icon-only="true"
          :variant="pageData.sortOrder === 'asc' ? 'flat' : 'light'"
          size="lg"
          @click="pageData.sortOrder = 'asc'"
        >
          <KunIcon class="text-inherit" name="lucide:arrow-up" />
        </KunButton>
      </div>

      <ToolsetComment
        v-for="comment in data.commentData"
        :key="comment.id"
        :comment="comment"
        :owner-id="ownerId || 0"
        @remove="removeComment"
        @replied="refresh()"
        @updated="updateComment"
      />

      <KunPagination
        v-if="data.totalCount >= pageData.limit"
        v-model:current-page="pageData.page"
        :total-page="Math.ceil(data.totalCount / pageData.limit)"
      />
    </div>
  </div>
</template>
