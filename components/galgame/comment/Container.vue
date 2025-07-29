<script setup lang="ts">
const props = defineProps<{
  userData: KunUser[]
  targetUser: KunUser
}>()

const route = useRoute()
const { commentToUid } = storeToRefs(useTempGalgameResourceStore())

const username = ref(props.targetUser.name)
const gid = parseInt((route.params as { gid: string }).gid)

const pageData = reactive({
  galgameId: gid,
  page: 1,
  limit: 30,
  sortOrder: 'desc'
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
    props.userData.find((user) => user.name === name)?.id || props.targetUser.id
}

onMounted(() => (commentToUid.value = props.targetUser.id))
</script>

<template>
  <div class="space-y-3">
    <KunHeader name="游戏评论" scale="h2">
      <template #endContent>
        <KunLink size="sm" to="/topic/1482">
          Galgame 评论注意事项, 资源失效, 解压密码错误等问题反馈
        </KunLink>
      </template>
    </KunHeader>

    <div class="flex items-center gap-2" v-if="targetUser">
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
      <GalgameCommentPanel :to-user="targetUser" :refresh="refresh">
        <div v-if="data.totalCount" class="flex items-center gap-2">
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
      </GalgameCommentPanel>

      <KunLoading v-if="status === 'pending'" />

      <KunNull
        v-if="!data.totalCount && status !== 'pending'"
        description="没人评论, 是没人要这个 Galgame 的小只可爱软萌女孩子了吗, 呜呜呜呜呜呜！！"
      />

      <div class="space-y-3" v-if="status !== 'pending' && data.totalCount">
        <GalgameComment
          v-for="comment in data.commentData"
          :key="comment.id"
          :comment="comment"
          :refresh="refresh"
        />
      </div>

      <KunPagination
        v-if="data.totalCount > 30 || data.totalCount === 30"
        v-model:current-page="pageData.page"
        :total-page="Math.ceil(data.totalCount / pageData.limit)"
        :is-loading="status === 'pending'"
      />
    </div>
  </div>
</template>
