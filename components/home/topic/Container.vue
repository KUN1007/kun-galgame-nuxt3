<script setup lang="ts">
import type { HomeTopic } from '~/types/api/home'

const topicData = ref<HomeTopic[] | null>()
const pageData = reactive({
  page: 1,
  limit: 10
})

const { data, pending } = await useFetch(`/api/home/topic`, {
  method: 'GET',
  query: pageData
})
topicData.value = data.value

watch(
  () => [pageData.page, pending.value],
  () => {
    if (data.value && !pending.value && pageData.page > 1) {
      topicData.value = topicData.value?.concat(data.value)
    }
  }
)

const handleClose = () => {
  topicData.value = topicData.value?.slice(0, 10)
  pageData.page = 1
}
</script>

<template>
  <div class="container" v-if="topicData">
    <div v-for="(topic, index) in topicData" :key="index">
      <HomeTopic :="topic" />

      <KunDivider margin="0 7px" />
    </div>
  </div>

  <HomeLoader v-model="pageData.page" :pending="pending">
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
