<script setup lang="ts">
defineProps<{
  toUser: KunUser
}>()

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
    icon: 'lucide:arrow-up',
    value: 'asc'
  },
  {
    icon: 'lucide:arrow-down',
    value: 'desc'
  }
]

const { data, pending, refresh } = await useLazyFetch(
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
    <template #header>
      {{ $t('galgame.comment.name') }}
    </template>
    <template #addition>
      <span class="to-user" v-if="toUser">
        <span>{{ $t('galgame.comment.to') }}</span>
        <NuxtLinkLocale :to="`/kungalgamer/${toUser.uid}/info`">
          {{ toUser.name }}
        </NuxtLinkLocale>
      </span>
    </template>
  </KunHeader>

  <div class="header">
    <GalgameCommentPanel :to-user="toUser" :refresh="refresh">
      <KunNav
        class="nav"
        v-if="data && data.totalCount"
        :items="orderItems"
        :default-value="pageData.order"
        @set="(value) => (pageData.order = value)"
      />
    </GalgameCommentPanel>

    <div class="sad" v-if="!data?.totalCount && !pending">
      {{ $t('galgame.comment.sad') }}
    </div>

    <div class="comments" v-if="!pending && data && data.totalCount">
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

  <KunFooter />

  <KunSkeletonGalgameComment v-if="pending" />
</template>

<style lang="scss" scoped>
.to-user {
  a {
    margin-left: 10px;
    color: var(--kungalgame-blue-5);
  }
}

.header {
  margin-top: 10px;
}

.sad {
  display: flex;
  justify-content: center;
  color: var(--kungalgame-blue-2);
  font-style: oblique;
  margin: 10px 0;
}
</style>
