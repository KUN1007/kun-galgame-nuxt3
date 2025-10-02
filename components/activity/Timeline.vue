<script setup lang="ts">
import {
  KUN_ACTIVITY_TYPE_TYPE,
  KUN_ACTIVITY_ICON_MAP
} from '~/constants/activity'

const pageData = reactive({
  page: 1,
  limit: 50
})

const { data, status } = await useFetch('/api/activity/timeline', {
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
      name="动态时间线"
      description="动态时间线, 展示全站 话题, 回复, Galgame 与社区的最新 Galgame 资源, Galgame 动态, Galgame 讨论, Galgame 评论等"
    />

    <div class="relative space-y-6">
      <div
        class="from-primary to-secondary absolute top-6 bottom-0 left-4 w-0.5 bg-gradient-to-b opacity-20"
      />

      <div
        v-for="(activity, index) in data.items"
        :key="index"
        class="flex items-center gap-3"
      >
        <KunAvatar v-if="activity.actor" :user="activity.actor" />

        <div class="flex flex-col space-y-2">
          <KunLink
            underline="none"
            color="default"
            :to="activity.link"
            class-name="hover:text-primary block space-x-3 break-all transition-colors"
          >
            <KunContentText
              class-name="whitespace-normal!"
              :content="activity.content"
            />
            <KunBadge color="primary" size="xs">
              {{ KUN_ACTIVITY_TYPE_TYPE[activity.type] }}
            </KunBadge>
          </KunLink>

          <div class="flex items-center space-x-2">
            <span class="text-default-500 text-sm">
              {{
                activity.actor
                  ? `${activity.actor.name} 发布于 ${formatTimeDifference(activity.timestamp)}`
                  : formatTimeDifference(activity.timestamp)
              }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <KunPagination
      v-model:current-page="pageData.page"
      :total-page="Math.ceil(data.totalCount / pageData.limit)"
      :is-loading="status === 'pending'"
    />
  </KunCard>
</template>
