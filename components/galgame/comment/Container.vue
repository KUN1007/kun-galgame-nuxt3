<script setup lang="ts">
const { userData, toUser } = defineProps<{
  userData: KunUser[]
  toUser: KunUser
}>()

const route = useRoute()
const { commentToUid } = storeToRefs(useTempGalgameResourceStore())

const username = ref(toUser.name)
const gid = parseInt((route.params as { gid: string }).gid)

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
  `/api/galgame/${gid}/comment/all`,
  {
    method: 'GET',
    query: pageData,
    ...kungalgameResponseHandler
  }
)

const handleSetUserInfo = (name: string) => {
  username.value = name
  commentToUid.value =
    userData.find((user) => user.name === name)?.uid || toUser.uid
}

onMounted(() => (commentToUid.value = toUser.uid))
</script>

<template>
  <KunHeader :size="2">
    <template #header>
      {{ $t('galgame.comment.name') }}
    </template>
    <template #addition>
      <div class="to-user" v-if="toUser">
        <div>{{ $t('galgame.comment.to') }}</div>
        <KunSelect
          :styles="{ width: '100%' }"
          :chooser-styles="{ justifyContent: 'flex-start' }"
          :options="userData.map((user) => user.name)"
          :discard-i18n="true"
          @set="handleSetUserInfo"
          position="bottom"
        >
          {{ username }}
        </KunSelect>
      </div>
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
  display: flex;
  align-items: center;

  & > div {
    white-space: nowrap;
    margin-right: 10px;
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
  font-size: 15px;
}
</style>
