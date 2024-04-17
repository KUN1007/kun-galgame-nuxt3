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
  <div class="resource">
    <KunHeader :size="2">
      <template #header>
        <span>{{ $t('edit.galgame.resource.name') }}</span>

        <span class="contribute" @click="handleClickContribute">
          <Icon name="lucide:circle-plus" />
        </span>
      </template>
    </KunHeader>

    <GalgameNull class="null" v-if="!data?.length" />

    <GalgameResourcePublish v-if="isShowPublish" :refresh="refresh" />

    <div v-if="!pending">
      <GalgameResourceLink
        v-for="resource in data"
        :key="resource.grid"
        :link="resource"
        :refresh="refresh"
      />
    </div>
    <KunSkeletonGalgameResource v-if="pending" />
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

.null {
  margin-bottom: 17px;
}
</style>
