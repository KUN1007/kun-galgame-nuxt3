<script setup lang="ts">
const route = useRoute()
const gid = computed(() => {
  return parseInt((route.params as { gid: string }).gid)
})

const pageData = reactive({
  page: 1,
  limit: 7
})

const { data, pending, refresh } = await useLazyFetch(
  `/api/galgame/${gid.value}/pr/all`,
  {
    method: 'GET',
    query: pageData,
    ...kungalgameResponseHandler
  }
)
</script>

<template>
  <div class="container" v-if="data && data.prs.length">
    <KunHeader :size="2">
      <template #header>
        {{ $t('galgame.pr.name') }}
      </template>
    </KunHeader>

    <div v-if="!pending">
      <GalgamePrInfo
        v-for="(pr, index) in data.prs"
        :key="index"
        :gid="gid"
        :pr="pr"
        :pending="pending"
        :refresh="refresh"
      />
    </div>
    <KunSkeletonGalgameResource v-if="pending" />

    <KunPagination
      class="pagination"
      v-if="data.totalCount > 7"
      :page="pageData.page"
      :limit="pageData.limit"
      :sum="data.totalCount"
      :loading="pending"
      @set-page="(newPage) => (pageData.page = newPage)"
    />
  </div>
</template>

<style lang="scss" scoped></style>
