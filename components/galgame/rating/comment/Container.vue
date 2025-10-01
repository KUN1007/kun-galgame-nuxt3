<script setup lang="ts">
import type { GalgameRatingComment } from '~/types/api/galgame-rating'

const props = defineProps<{
  ratingId: number
  ratingAuthor: KunUser
  commentsData: GalgameRatingComment[]
}>()

const sortOrder = ref<'desc' | 'asc'>('desc')
const comments = ref<GalgameRatingComment[]>([...props.commentsData])

const sortedComments = computed(() => {
  return [...comments.value].sort((a, b) => {
    const ta = new Date(a.created).getTime()
    const tb = new Date(b.created).getTime()
    return sortOrder.value === 'desc' ? tb - ta : ta - tb
  })
})

const handleEditCommentSuccess = (updatedComment: GalgameRatingComment) => {
  const index = comments.value.findIndex((c) => c.id === updatedComment.id)
  if (index !== -1) {
    comments.value[index] = updatedComment
  }
}

const handleDeleteCommentSuccess = (commentId: number) => {
  comments.value = comments.value.filter((c) => c.id !== commentId)
}
</script>

<template>
  <KunCard :is-transparent="false" :is-hoverable="false">
    <KunHeader
      name="评论区"
      description="发布对这个评分的观点, 请不要锐评"
      scale="h2"
    />

    <div class="space-y-3">
      <div class="flex items-center gap-2">
        <KunButton
          :is-icon-only="true"
          :variant="sortOrder === 'desc' ? 'flat' : 'light'"
          size="lg"
          @click="sortOrder = 'desc'"
        >
          <KunIcon class="text-inherit" name="lucide:arrow-down" />
        </KunButton>
        <KunButton
          :is-icon-only="true"
          :variant="sortOrder === 'asc' ? 'flat' : 'light'"
          size="lg"
          @click="sortOrder = 'asc'"
        >
          <KunIcon class="text-inherit" name="lucide:arrow-up" />
        </KunButton>
      </div>

      <GalgameRatingCommentPanel
        :rating-id="ratingId"
        :target-user-id="ratingAuthor.id"
        @on-success="(newComment) => comments.push(newComment)"
      />

      <KunNull v-if="comments.length === 0" />

      <div class="space-y-3" v-else>
        <GalgameRatingComment
          v-for="comment in sortedComments"
          :key="comment.id"
          :rating-id="ratingId"
          :rating-author-id="ratingAuthor.id"
          :comment="comment"
          @on-edit-success="handleEditCommentSuccess"
          @on-delete-success="handleDeleteCommentSuccess"
          @on-create-success="(newComment) => comments.push(newComment)"
        />
      </div>
    </div>
  </KunCard>
</template>
