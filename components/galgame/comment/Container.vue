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

const { data, status, refresh } = await useLazyFetch(
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
    <template #header>评论</template>
    <template #addition>
      <NuxtLink class="notice" to="/topic/1482">
        Galgame 评论注意事项, 资源失效, 解压密码错误等问题反馈
      </NuxtLink>
    </template>
  </KunHeader>

  <div class="to-user" v-if="toUser">
    <div>评论给</div>
    <KunSelect
      :styles="{ width: '100%' }"
      :chooser-styles="{ justifyContent: 'flex-start' }"
      :options="userData.map((user) => user.name)"
      :discard-i18n="true"
      @set="handleSetUserInfo"
    >
      {{ username }}
    </KunSelect>
  </div>

  <div class="panel">
    <GalgameCommentPanel :to-user="toUser" :refresh="refresh">
      <KunTab
        class="nav"
        v-if="data && data.totalCount"
        :items="orderItems"
        :default-value="pageData.order"
        @set="(value) => (pageData.order = value)"
      />
    </GalgameCommentPanel>

    <div class="sad" v-if="!data?.totalCount && status !== 'pending'">
      没人评论, 是没人要这个 Galgame 的小只可爱软萌妹子了吗, 呜呜呜...
    </div>

    <div
      class="comments"
      v-if="status !== 'pending' && data && data.totalCount"
    >
      <GalgameComment
        v-for="comment in data.commentData"
        :key="comment.gcid"
        :comment="comment"
        :refresh="refresh"
      />

      <KunPagination
        class="pagination"
        v-if="data.totalCount > 10"
        :page="pageData.page"
        :limit="pageData.limit"
        :sum="data.totalCount"
        :status="status"
        @set-page="(newPage) => (pageData.page = newPage)"
      />
    </div>
  </div>

  <KunFooter />

  <KunSkeletonGalgameComment v-if="status === 'pending'" />
</template>

<style lang="scss" scoped>
.to-user {
  display: flex;
  align-items: center;
  margin-top: 17px;

  & > div {
    white-space: nowrap;
    margin-right: 10px;
  }
}

.panel {
  margin-top: 10px;
}

.notice {
  font-size: small;
  color: var(--kungalgame-blue-5);
  color: var(--kungalgame-blue-5);
  text-decoration: underline;
  text-underline-offset: 3px;
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
