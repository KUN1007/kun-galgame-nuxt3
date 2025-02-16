<script setup lang="ts">
import { KUN_UPDATE_LOG_TYPE_MAP } from '~/constants/update-log'

const pageData = ref({
  page: 1,
  limit: 10,
  language: 'zh-cn'
})

const { data, status } = await useFetch(`/api/update/history`, {
  method: 'GET',
  query: pageData,
  ...kungalgameResponseHandler
})

watch(
  () => status.value,
  () => {
    if (status.value === 'success') {
      window?.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
)
</script>

<template>
  <ul class="history-list" v-if="data">
    <li v-for="kun in data.updates" :key="kun.upid">
      <span class="type">{{ KUN_UPDATE_LOG_TYPE_MAP[kun.type] }}</span>
      <pre>{{ kun.content['zh-cn'] }}</pre>
      <span class="time">{{ kun.time }} - Version {{ kun.version }}</span>
    </li>
  </ul>

  <KunPagination
    class="pagination"
    v-if="data && data.totalCount > 10"
    :page="pageData.page"
    :limit="pageData.limit"
    :sum="data.totalCount"
    :status="status"
    @set-page="(newPage) => (pageData.page = newPage)"
  />
</template>

<style lang="scss" scoped>
.history-list {
  padding: 10px;
}

li {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-left: 5px solid var(--kungalgame-blue-5);
  padding-left: 17px;

  &:first-child {
    margin-top: 10px;
  }
}

.type {
  color: var(--kungalgame-blue-5);
  font-weight: bold;
}

pre {
  white-space: pre-wrap;
  word-break: break-word;
}

.time {
  display: flex;
  justify-content: flex-end;
  font-size: 13px;
  margin-top: 7px;
  margin-right: 10px;
  letter-spacing: 1px;
}
</style>
