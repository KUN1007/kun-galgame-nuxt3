<script setup lang="ts">
const route = useRoute()
const gid = computed(() => {
  return parseInt((route.params as { gid: string }).gid)
})

const { isShowPublish, rewriteResourceId } = storeToRefs(
  useTempGalgameResourceStore()
)

const { data: resourceData, refresh } = await useLazyFetch(
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
  <div class="resource">
    <KunHeader :size="2">
      <template #header>
        <span>{{ $t('edit.galgame.resource.name') }}</span>

        <span class="contribute" @click="handleClickContribute">
          <Icon name="lucide:circle-plus" />
        </span>
      </template>
    </KunHeader>

    <GalgameNull v-if="!resourceData?.length" />

    <GalgameResourcePublish v-if="isShowPublish" :refresh="refresh" />

    <GalgameResourceLink
      v-for="resource in resourceData"
      :key="resource.grid"
      :link="resource"
      :refresh="refresh"
    />
  </div>
</template>

<style lang="scss" scoped>
.resource {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.contribute {
  cursor: pointer;
  margin-left: 17px;
  padding: 3px;
  border-radius: 20px;
  color: var(--kungalgame-blue-5);
}
</style>
