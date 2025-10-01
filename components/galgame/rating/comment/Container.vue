<script setup lang="ts">
const props = defineProps<{
  ratingId: number
  ratingAuthor: KunUser
  comments: Array<{
    id: number
    content: string
    user: KunUser
    targetUser: KunUser | null
    created: string | Date
    updated: string | Date
  }>
}>()

const sortOrder = ref<'desc' | 'asc'>('desc')

const sortedComments = computed(() => {
  const arr = [...props.comments]
  arr.sort((a, b) => {
    const ta = new Date(a.created).getTime()
    const tb = new Date(b.created).getTime()
    return sortOrder.value === 'desc' ? tb - ta : ta - tb
  })
  return arr
})
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
      />

      <KunNull
        v-if="sortedComments.length === 0"
        description="还没有人评论，来做第一个吧！"
      />

      <div class="space-y-3" v-else>
        <GalgameRatingComment
          v-for="c in sortedComments"
          :key="c.id"
          :rating-id="ratingId"
          :rating-author-id="ratingAuthor.id"
          :comment="c"
        />
      </div>
    </div>
  </KunCard>
</template>
