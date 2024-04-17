<script setup lang="ts">
const route = useRoute()
const gid = computed(() => {
  return parseInt((route.params as { gid: string }).gid)
})

const pageData = reactive({
  page: 1,
  limit: 10,
  order: 'desc'
})

const orderItems = [
  {
    i18n: 'galgame.comment.asc',
    value: 'asc'
  },
  {
    i18n: 'galgame.comment.desc',
    value: 'desc'
  }
]

const { data, pending, refresh } = await useFetch(
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
    <GalgameCommentPanel :to-uid="0" :refresh="refresh">
      <KunNav
        class="nav"
        v-if="data && data.totalCount"
        :items="orderItems"
        :default-value="pageData.order"
        @set="(value) => (pageData.order = value)"
      />
    </GalgameCommentPanel>

    <div v-if="!data?.totalCount">
      没人评论, 是没人要这个游戏的小只可爱软萌妹子了吗, 呜呜呜...
    </div>

    <div class="comments" v-if="data && data.totalCount">
      <GalgameComment
        v-for="comment in data.commentData"
        :key="comment.gcid"
        :comment="comment"
        :refresh="refresh"
        @close="() => {}"
      />

      <KunPagination
        class="pagination"
        v-if="data.totalCount > 10"
        :page="pageData.page"
        :limit="pageData.limit"
        :sum="data.totalCount"
        :loading="pending"
        @set-page="(newPage) => (pageData.page = newPage)"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
