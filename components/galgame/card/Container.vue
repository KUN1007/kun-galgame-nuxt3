<script setup lang="ts">
const pageData = storeToRefs(useTempGalgameStore())

const { data, pending } = await useFetch(`/api/galgame`, {
  method: 'GET',
  query: pageData,
  ...kungalgameResponseHandler
})
</script>

<template>
  <div class="container">
    <GalgameCard v-if="data?.galgames" :galgames="data?.galgames" />

    <div class="declaration">
      {{ $t('galgame.declaration') }}
    </div>

    <KunPagination
      class="pagination"
      v-if="data?.totalCount"
      :page="pageData.page.value"
      :limit="pageData.limit.value"
      :sum="data?.totalCount"
      :loading="pending"
      @set-page="(newPage) => (pageData.page.value = newPage)"
    />
  </div>
</template>

<style lang="scss" scoped>
.container {
  background-color: var(--kungalgame-trans-white-5);
  backdrop-filter: blur(10px);
  will-change: transform;
  border-radius: 10px;
  box-shadow: var(--shadow);
  padding: 17px;
}

.declaration {
  user-select: none;
  margin-top: 17px;
  text-align: center;
  font-size: small;
  color: var(--kungalgame-font-color-0);
}
</style>
