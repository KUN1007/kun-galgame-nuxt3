<script setup lang="ts">
import type { HomeGalgame } from '~/types/api/home'

const GalgameData = ref<HomeGalgame[] | null>()
const pageData = reactive({
  page: 1,
  limit: 10
})

const { data, status } = await useFetch(`/api/home/galgame`, {
  method: 'GET',
  query: pageData
})
GalgameData.value = data.value

watch(
  () => [pageData.page, status.value],
  () => {
    if (data.value && status.value !== 'pending' && pageData.page > 1) {
      GalgameData.value = GalgameData.value?.concat(data.value)
    }
  }
)

const handleClose = () => {
  GalgameData.value = GalgameData.value?.slice(0, 10)
  pageData.page = 1
}
</script>

<template>
  <div class="container" v-if="GalgameData">
    <div v-for="(galgame, index) in GalgameData" :key="index">
      <HomeGalgameCard :galgame="galgame" />

      <KunDivider margin="0 7px" color="var(--kungalgame-trans-blue-1)" />
    </div>
  </div>

  <HomeLoader v-model="pageData.page" :status="status">
    <span v-if="pageData.page !== 1" class="close" @click="handleClose">
      {{ $t('home.fold') }}
    </span>
  </HomeLoader>
</template>

<style lang="scss" scoped>
.close {
  margin-left: 17px;
  cursor: pointer;
  padding-right: 17px;

  &:hover {
    color: var(--kungalgame-blue-5);
  }
}
</style>
