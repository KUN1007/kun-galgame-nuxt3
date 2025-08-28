<script setup lang="ts">
import { KUN_ACTIVITY_TYPE_TYPE } from '~/constants/activity'

const { data } = await useFetch('/api/home/message', {
  method: 'GET'
})
</script>

<template>
  <KunCard
    :is-transparent="false"
    v-if="data"
    class-name="h-full"
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
  </KunCard>
</template>
