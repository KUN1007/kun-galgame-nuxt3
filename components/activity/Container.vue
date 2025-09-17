<script setup lang="ts">
import { KUN_ACTIVITY_TYPE_TYPE } from '~/constants/activity'

const activityPageTabs = Object.entries(KUN_ACTIVITY_TYPE_TYPE).map(
  ([key, value]) => ({
    value: key,
    textValue: value
  })
)

const pageData = reactive({
  page: 1,
  limit: 50,
  type: 'TOPIC_CREATION'
})

const { data, status } = await useFetch('/api/activity', {
  method: 'GET',
  query: pageData,
  ...kungalgameResponseHandler
})
</script>

<template>
  <KunCard
    :is-transparent="false"
    v-if="data"
    content-class="space-y-3"
    :is-hoverable="false"
  >
    <KunHeader
      name="最新动态"
      description="这里展示了论坛的所有动态, 包括 Galgame, Galgame 资源, Galgame 网站, 话题, 回复, 评论, 网站更新 等"
    />

    <KunTab
      :has-scrollbar="true"
      :model-value="pageData.type"
      @update:model-value="(value) => (pageData.type = value)"
      :items="activityPageTabs"
      size="sm"
    />

    <div
      v-for="(activity, index) in data.items"
      :key="index"
      class="flex flex-col space-y-2"
    >
      <KunLink
        underline="none"
        color="default"
        :to="activity.link"
        class-name="hover:text-primary line-clamp-3 break-all transition-colors"
      >
        {{ activity.content }}
        <KunBadge class-name="cursor-pointer" color="primary" size="xs">
          {{ KUN_ACTIVITY_TYPE_TYPE[activity.type] }}
        </KunBadge>
      </KunLink>

      <div class="flex items-center space-x-2">
        <KunUser size="sm" v-if="activity.actor" :user="activity.actor" />
        <span class="text-default-500 text-sm">
          {{ formatTimeDifference(activity.timestamp) }}
        </span>
      </div>
    </div>

    <KunPagination
      v-model:current-page="pageData.page"
      :total-page="Math.ceil(data.totalCount / pageData.limit)"
      :is-loading="status === 'pending'"
    />
  </KunCard>
</template>
