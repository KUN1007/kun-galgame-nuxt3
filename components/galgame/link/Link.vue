<script setup lang="ts">
import { checkGalgameLinkPublish } from '../utils/checkGalgameLinkPublish'

const { id } = usePersistUserStore()
const route = useRoute()
const gid = computed(() => {
  return parseInt((route.params as { gid: string }).gid)
})

const isShowEdit = ref(false)
const isFetching = ref(false)
const linkModel = reactive({
  name: '',
  link: '',
  galgameId: gid.value
})

const { data, status, refresh } = await useLazyFetch(
  `/api/galgame/${gid.value}/link/all`,
  {
    method: 'GET',
    query: { galgameId: gid.value },
    watch: false,
    ...kungalgameResponseHandler
  }
)

const handlePublishLink = async () => {
  if (!checkGalgameLinkPublish(linkModel.name, linkModel.link)) {
    return
  }

  isFetching.value = true
  const result = await $fetch(`/api/galgame/${gid.value}/link`, {
    method: 'POST',
    body: linkModel,
    watch: false,
    ...kungalgameResponseHandler
  })
  isFetching.value = false

  if (result) {
    linkModel.name = ''
    linkModel.link = ''
    refresh()
  }
}

const handleDeleteLink = async (gid: number, glid: number) => {
  const res = await useComponentMessageStore().alert(
    '您确定删除该 Galgame 相关链接吗？'
  )
  if (!res) {
    return
  }

  const result = await $fetch(`/api/galgame/${gid}/link`, {
    method: 'DELETE',
    query: { galgameLinkId: glid },
    watch: false,
    ...kungalgameResponseHandler
  })

  if (result) {
    refresh()
  }
}
</script>

<template>
  <div class="flex flex-col space-y-3">
    <KunHeader
      name="相关链接"
      description="这里可以添加任何与该游戏有关的链接, 例如论坛话题, 其它网络文章, 视频链接, 媒体链接等等"
      scale="h3"
    >
      <template #endContent>
        <KunButton
          size="sm"
          variant="flat"
          class-name="shrink-0"
          @click="isShowEdit = !isShowEdit"
        >
          添加相关链接
        </KunButton>
      </template>
    </KunHeader>

    <KunLoading v-if="status === 'pending'" />
    <GalgameNull v-if="status !== 'pending' && !data?.length" />

    <KunAnimationFadeCard>
      <div class="space-y-2" v-if="isShowEdit">
        <KunCard :is-hoverable="false">
          <p>
            <strong>我们鼓励添加游戏的正版购买链接</strong>
          </p>
          <p>除官方购买链接外, 不得放置付费的引流链接</p>
          <p>我们会在发布游戏时自动添加 VNDB 链接</p>
        </KunCard>
        <KunInput placeholder="链接名" v-model="linkModel.name" />
        <KunInput placeholder="链接地址" v-model="linkModel.link" />
        <div class="flex justify-end">
          <KunButton @click="handlePublishLink" :loading="isFetching">
            创建链接
          </KunButton>
        </div>
      </div>
    </KunAnimationFadeCard>

    <div class="space-y-2" v-if="data">
      <KunCard :is-hoverable="false" v-for="(link, index) in data" :key="index">
        <p>{{ link.name }}</p>

        <div class="flex flex-wrap items-center gap-2">
          <KunLink :to="link.link" target="_blank" rel="noopener noreferrer">
            {{ link.link }}
            <KunIcon name="lucide:external-link" />
          </KunLink>

          <KunButton
            :is-icon-only="true"
            variant="flat"
            color="danger"
            size="sm"
            v-if="id === link.user.id"
            @click="handleDeleteLink(link.galgameId, link.id)"
            :loading="isFetching"
            class-name="ml-auto"
          >
            删除链接
            <KunIcon name="lucide:trash-2" />
          </KunButton>
        </div>
      </KunCard>
    </div>
  </div>
</template>
