<script setup lang="ts">
import { activityPageTabs } from '~/constants/activity'

const iconMap: Record<string, string> = {
  upvoted: 'lucide:sparkles',
  replied: 'carbon:reply',
  commented: 'uil:comment-dots',
  requested: 'lucide:git-pull-request-arrow'
}

const pageData = reactive({
  page: 1,
  limit: 50,
  type: 'all'
})

const { data, status } = await useFetch('/api/activity', {
  method: 'GET',
  query: pageData
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
      description="这里展示了论坛的所有动态, 最早可以追溯到论坛追加消息系统时"
    />

    <KunTab
      :model-value="pageData.type"
      @update:model-value="(value) => (pageData.type = value)"
      :items="activityPageTabs"
      size="sm"
    />

    <div
      v-for="(activity, index) in data.activities"
      :key="index"
      class="group flex items-start space-x-3 rounded-lg transition-colors"
    >
      <div
        class="bg-primary/10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full"
      >
        <KunIcon :name="iconMap[activity.type]" class="text-primary h-4 w-4" />
      </div>

      <div class="space-y-2">
        <KunLink
          underline="none"
          color="default"
          :to="
            activity.tid ? `/topic/${activity.tid}` : `/galgame/${activity.gid}`
          "
          class-name="hover:text-primary line-clamp-3 break-all transition-colors"
        >
          {{ activity.content }}
        </KunLink>

        <div class="flex items-center space-x-2">
          <KunLink
            underline="none"
            color="default"
            :to="`/user/${activity.uid}/info`"
            class-name="hover:text-foreground text-default-500 text-sm font-medium transition-colors"
          >
            {{ activity.name }}
          </KunLink>
          <span class="text-default-500 text-sm">
            {{ formatTimeDifference(activity.time) }}
          </span>
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
