<script setup lang="ts">
import {
  KUN_GALGAME_RESOURCE_PULL_REQUEST_ACTION_MAP,
  KUN_GALGAME_RESOURCE_PULL_REQUEST_TYPE_MAP
} from '~/constants/galgame'

const route = useRoute()
const gid = computed(() => {
  return parseInt((route.params as { gid: string }).gid)
})

const pageData = reactive({
  page: 1,
  limit: 10,
  galgameId: gid.value
})

const { data, status } = await useLazyFetch(
  `/api/galgame/${gid.value}/history/all`,
  {
    method: 'GET',
    query: pageData,
    ...kungalgameResponseHandler
  }
)
</script>

<template>
  <div class="flex flex-col space-y-3" v-if="data">
    <KunHeader
      name="贡献历史"
      description="这里记录了这个 Galgame 项目发生的所有更改历史, 资源下载链接更改历史不计"
      scale="h3"
    />

    <KunLoading v-if="status === 'pending'" />

    <div
      class="flex items-center gap-2 text-sm"
      v-for="(history, index) in data.historyData"
      :key="index"
    >
      <KunAvatar :user="history.user" />

      <div class="space-y-1">
        <div class="flex flex-wrap gap-2">
          <span>{{ history.user.name }}</span>
          <span>
            {{ KUN_GALGAME_RESOURCE_PULL_REQUEST_ACTION_MAP[history.action] }}
          </span>
          <span>
            {{ KUN_GALGAME_RESOURCE_PULL_REQUEST_TYPE_MAP[history.type] }}
          </span>
          <span class="text-default-500">
            {{ formatTimeDifference(history.created) }}
          </span>
        </div>

        <div class="text-default-500" v-if="history.content">
          {{ history.content }}
        </div>
      </div>
    </div>

    <KunPagination
      v-if="data.totalCount > 10 || data.totalCount === 10"
      v-model:current-page="pageData.page"
      :total-page="Math.ceil(data.totalCount / pageData.limit)"
      :is-loading="status === 'pending'"
    />
  </div>
</template>
