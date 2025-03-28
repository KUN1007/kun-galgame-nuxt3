<script setup lang="ts">
const route = useRoute()
const gid = computed(() => {
  return parseInt((route.params as { gid: string }).gid)
})

const { isShowPublish, rewriteResourceId } = storeToRefs(
  useTempGalgameResourceStore()
)

const { data, pending, refresh } = await useLazyFetch(
  `/api/galgame/${gid.value}/resource/all`,
  {
    method: 'GET',
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
    <KunHeader :is-show-divider="false" name="资源链接">
      <template #headerEndContent>
        <KunButton @click="handleClickContribute">添加资源</KunButton>
      </template>
      <template #endContent>
        <div class="text-sm">
          <div class="text-secondary-600">
            提示: 部分资源链接可能需要网络代理
          </div>
          <div class="inline-flex gap-1">
            <p>如果您找不到想要的资源链接, 可以去看看友站</p>
            <KunLink
              class-name="block whitespace-nowrap"
              size="sm"
              to="https://www.touchgal.io/"
              target="_blank"
            >
              TouchGal
            </KunLink>
            和
            <KunLink
              class-name="block whitespace-nowrap"
              size="sm"
              to="https://www.zi6.cc/"
              target="_blank"
            >
              zi0
            </KunLink>
          </div>
        </div>
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

    <template v-if="!pending">
      <GalgameResourceLink
        v-for="resource in data"
        :key="resource.grid"
        :link="resource"
        :refresh="refresh"
      />
    </template>

    <KunLoading v-if="pending" />
  </div>
</template>
