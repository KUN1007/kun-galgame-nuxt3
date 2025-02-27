<script setup lang="ts">
import { KUN_GALGAME_RESOURCE_PULL_REQUEST_ACTION_MAP } from '~/constants/galgame'

const route = useRoute()
const gid = computed(() => {
  return parseInt((route.params as { gid: string }).gid)
})

const pageData = reactive({
  page: 1,
  limit: 7
})

const { data, status } = await useFetch(
  `/api/galgame/${gid.value}/history/all`,
  {
    method: 'GET',
    query: pageData,
    ...kungalgameResponseHandler
  }
)
</script>

<template>
  <KunHeader :size="2">
    <template #header>贡献历史</template>
  </KunHeader>

  <div class="container" v-if="data">
    <div
      class="history"
      v-for="(history, index) in data.historyData"
      :key="index"
    >
      <NuxtLink :to="`/kungalgamer/${history.user.uid}/info`">
        <KunAvatar :user="history.user" size="30px" />
      </NuxtLink>

      <div class="info">
        <div>
          <span>{{ history.user.name }}</span>
          <span>
            {{ KUN_GALGAME_RESOURCE_PULL_REQUEST_ACTION_MAP[history.action] }}
          </span>
          <span>
            {{ KUN_GALGAME_RESOURCE_PULL_REQUEST_TYPE_MAP[history.type] }}
          </span>
          <span class="time">
            {{ formatTimeDifference(history.time) }}
          </span>
        </div>

        <div class="content" v-if="history.content">
          {{ history.content }}
        </div>
      </div>
    </div>

    <KunPagination
      class="pagination"
      v-if="data.totalCount > 7"
      :page="pageData.page"
      :limit="pageData.limit"
      :sum="data.totalCount"
      :status="status"
      @set-page="(newPage) => (pageData.page = newPage)"
    />
  </div>
</template>

<style lang="scss" scoped>
h2 {
  margin-bottom: 17px;
}

.container {
  display: flex;
  flex-direction: column;
}

.history {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-size: small;

  .info {
    span {
      margin-left: 7px;
    }

    .time {
      color: var(--kungalgame-font-color-0);
    }
  }

  .content {
    margin-left: 7px;
    margin-top: 5px;
    color: var(--kungalgame-font-color-0);
  }
}
</style>
