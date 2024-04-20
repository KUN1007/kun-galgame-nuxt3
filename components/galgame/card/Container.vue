<script setup lang="ts">
const { page, limit, sortOrder } = storeToRefs(usePersistGalgameStore())

const { data, pending } = await useFetch(`/api/galgame`, {
  method: 'GET',
  query: { page, limit, sortOrder },
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
      :page="parseInt(page)"
      :limit="parseInt(limit)"
      :sum="data?.totalCount"
      :loading="pending"
      @set-page="(newPage) => (page = newPage.toString())"
    />
  </div>
</template>

<style lang="scss" scoped>
.container {
  background-color: var(--kungalgame-trans-white-5);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  box-shadow: var(--kungalgame-shadow-0);
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
