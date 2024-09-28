<script setup lang="ts">
const pageData = storeToRefs(useTempGalgameStore())

const { data, status } = await useFetch(`/api/galgame`, {
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
      :status="status"
      @set-page="(newPage) => (pageData.page.value = newPage)"
    />

    <KunFooter />
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding: 17px;

  @include kun-blur;
}

.declaration {
  user-select: none;
  margin-top: 17px;
  text-align: center;
  font-size: small;
  color: var(--kungalgame-font-color-0);
}

@media (max-width: 700px) {
  .container {
    margin: 0 5px;
    padding: 17px 10px;
  }
}
</style>
