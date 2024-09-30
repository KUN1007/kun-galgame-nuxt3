<script setup lang="ts">
import type { HomeGalgameResources } from '~/types/api/home'

const resourceData = ref<HomeGalgameResources[] | null>()
const pageData = reactive({
  page: 1,
  limit: 10
})

const { data, status } = await useFetch(`/api/home/resource`, {
  method: 'GET',
  query: pageData
})
resourceData.value = data.value

watch(
  () => [pageData.page, status.value],
  () => {
    if (data.value && status.value !== 'pending' && pageData.page > 1) {
      resourceData.value = resourceData.value?.concat(data.value)
    }
  }
)

const handleClose = () => {
  resourceData.value = resourceData.value?.slice(0, 10)
  pageData.page = 1
}
</script>

<template>
  <div class="container" v-if="resourceData">
    <HomeResourceLink
      v-for="resource in resourceData"
      :key="resource.grid"
      :link="resource"
    />
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
