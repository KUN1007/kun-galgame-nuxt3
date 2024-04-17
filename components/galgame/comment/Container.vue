<script setup lang="ts">
const route = useRoute()
const gid = computed(() => {
  return parseInt((route.params as { gid: string }).gid)
})

const pageData = reactive({
  page: 1,
  limit: 10
})

const { data, refresh } = await useFetch(
  `/api/galgame/${gid.value}/comment/all`,
  {
    method: 'GET',
    query: pageData,
    ...kungalgameResponseHandler
  }
)
</script>

<template>
  <KunHeader :size="2">
    <template #header>评论</template>
  </KunHeader>
  <div>
    <GalgameCommentPanel :to-uid="0" :refresh="refresh" />

    <div class="comments" v-if="data && data.totalCount">
      <GalgameComment
        v-for="comment in data.commentData"
        :key="comment.gcid"
        :comment="comment"
        :refresh="refresh"
        @close="() => {}"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
