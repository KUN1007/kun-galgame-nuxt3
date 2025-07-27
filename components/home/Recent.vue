<script setup lang="ts">
import { KUN_ACTIVITY_TYPE_TYPE } from '~/constants/activity'
import { useOnlineUser } from '~/composables/online/useOnlineUser'

const { onlineCount } = useOnlineUser()

const { data } = await useFetch('/api/home/message', {
  method: 'GET'
})
</script>

<template>
  <KunCard
    :is-transparent="false"
    v-if="data"
    content-class="space-y-3"
    :is-hoverable="false"
  >
    <div class="flex items-center gap-3">
      <h2 class="text-xl font-semibold">最新动态</h2>
      <KunLink
        underline="none"
        class-name="text-default-500 hover:text-primary text-sm transition-colors"
        to="/activity"
      >
        查看更多 >
      </KunLink>
    </div>

    <div
      v-for="(activity, index) in data"
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

    <div class="flex flex-col items-center justify-center gap-1 text-sm">
      <p class="text-default-500">
        {{ `当前网站在线 ${onlineCount.total} 只萝莉` }}
      </p>
      <p class="text-default-500">
        {{
          `${onlineCount.user} 注册萝莉 - ${onlineCount.guest} 正在视奸的萝莉`
        }}
      </p>
      <p class="text-default-500">(本统计结果已排除 Bot 和爬虫)</p>
    </div>
  </KunCard>
</template>
