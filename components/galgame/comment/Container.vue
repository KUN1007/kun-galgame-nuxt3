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
  limit: 30,
  order: 'desc'
})

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
  <div class="space-y-3">
    <KunHeader name="游戏评论" scale="h2">
      <template #endContent>
        <KunLink to="/topic/1482">
          Galgame 评论注意事项, 资源失效, 解压密码错误等问题反馈
        </KunLink>
      </template>
    </KunHeader>

    <div class="flex items-center gap-2" v-if="toUser">
      <div class="whitespace-nowrap">评论给</div>
      <KunSelect
        :model-value="username"
        :options="
          userData.map((user) => ({ value: user.name, label: user.name }))
        "
        @set="(value) => handleSetUserInfo(value.toString())"
      >
        {{ username }}
      </KunSelect>
    </div>

    <div class="space-y-3" v-if="data">
      <GalgameCommentPanel :to-user="toUser" :refresh="refresh">
        <div v-if="data.totalCount" class="flex items-center gap-2">
          <KunButton
            :is-icon-only="true"
            :variant="pageData.order === 'desc' ? 'flat' : 'light'"
            size="lg"
            @click="pageData.order = 'desc'"
          >
            <KunIcon class="text-inherit" name="lucide:arrow-down" />
          </KunButton>

          <KunButton
            :is-icon-only="true"
            :variant="pageData.order === 'asc' ? 'flat' : 'light'"
            size="lg"
            @click="pageData.order = 'asc'"
          >
            <KunIcon class="text-inherit" name="lucide:arrow-up" />
          </KunButton>
        </div>
      </GalgameCommentPanel>

      <KunLoading v-if="status === 'pending'" />

      <KunNull
        v-if="!data.totalCount && status !== 'pending'"
        description="没人评论, 是没人要这个 Galgame 的小只可爱软萌女孩子了吗, 呜呜呜呜呜呜！！"
      />

      <div class="space-y-3" v-if="status !== 'pending' && data.totalCount">
        <GalgameComment
          v-for="comment in data.commentData"
          :key="comment.gcid"
          :comment="comment"
          :refresh="refresh"
        />
      </div>

      <KunPagination
        v-model:current-page="pageData.page"
        :total-page="Math.ceil(data.totalCount / pageData.limit)"
        :is-loading="status === 'pending'"
      />
    </div>
  </div>
</template>
