<script setup lang="ts">
const route = useRoute()
const gid = computed(() => {
  return parseInt((route.params as { gid: string }).gid)
})

const { isShowPublish, rewriteResourceId } = storeToRefs(
  useTempGalgameResourceStore()
)
const { id } = usePersistUserStore()

const { data, status, refresh } = await useLazyFetch(
  `/api/galgame/${gid.value}/resource/all`,
  {
    method: 'GET',
    query: { galgameId: gid.value },
    ...kungalgameResponseHandler
  }
)

const handleClickContribute = () => {
  if (!rewriteResourceId.value) {
    isShowPublish.value = !isShowPublish.value
  }
}

watch(
  () => rewriteResourceId.value,
  () => {
    if (rewriteResourceId.value) {
      isShowPublish.value = true
    } else {
      isShowPublish.value = false
    }
  }
)
</script>

<template>
  <div class="space-y-3">
    <KunHeader name="Galgame 资源链接" scale="h2">
      <template #headerEndContent>
        <div class="ml-auto flex items-center gap-1">
          <KunButton
            v-if="id"
            :href="`/user/${id}/resource/expire`"
            color="success"
            variant="flat"
          >
            批量更改已失效资源链接
          </KunButton>
          <KunButton @click="handleClickContribute">添加资源</KunButton>
        </div>
      </template>

      <template #endContent>
        <KunInfo
          color="info"
          title="一些小提示以及帮助文档"
          description="部分资源链接可能需要网络代理"
        >
          <div class="my-1 text-sm">
            <span>如果您找不到想要的资源链接, 可以去看看友站</span>
            <KunLink
              class-name="inline whitespace-nowrap"
              size="sm"
              to="https://www.touchgal.us/"
              target="_blank"
            >
              TouchGal
            </KunLink>
            和
            <KunLink
              class-name="inline whitespace-nowrap"
              size="sm"
              to="https://zi6.cc/"
              target="_blank"
            >
              zi0
            </KunLink>
          </div>

          <div class="mb-1 flex items-center gap-1">
            <KunLink class-name="inline" size="sm" to="/topic/2431">
              Galgame萌新入门(待补充)
            </KunLink>
            - by
            <KunUser
              size="sm"
              :user="{
                id: 19994,
                name: '大伊兜子',
                avatar: 'https://image.kungal.com/avatar/user_19994/avatar.webp'
              }"
            />
          </div>

          <div class="flex items-center gap-1">
            <KunLink class-name="inline" size="sm" to="/topic/2522">
              如何安装镜像文件(教程)
            </KunLink>
            - by
            <KunUser
              size="sm"
              :user="{
                id: 19994,
                name: '大伊兜子',
                avatar: 'https://image.kungal.com/avatar/user_19994/avatar.webp'
              }"
            />
          </div>
        </KunInfo>
      </template>
    </KunHeader>

    <KunNull
      v-if="!data?.length"
      description="这个 Galgame 还没有资源链接, 快添加一个吧!"
    />

    <KunModal
      :is-dismissable="false"
      :is-show-close-button="false"
      :modal-value="isShowPublish"
      @update:modal-value="(value) => (isShowPublish = value)"
    >
      <GalgameResourcePublish
        :refresh="refresh"
        @close="isShowPublish = false"
      />
    </KunModal>

    <template v-if="status !== 'pending'">
      <GalgameResourceLink
        v-for="resource in data"
        :key="resource.id"
        :resource="resource"
        :refresh="refresh"
      />
    </template>

    <KunLoading v-if="status === 'pending'" />
  </div>
</template>
