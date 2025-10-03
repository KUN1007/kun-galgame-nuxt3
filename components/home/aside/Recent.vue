<script setup lang="ts">
import { KUN_ACTIVITY_TYPE_TYPE } from '~/constants/activity'
import type { ActivityItem } from '~/types/api/activity'

defineProps<{
  activities: ActivityItem[]
}>()
</script>

<template>
  <KunCard
    :is-transparent="false"
    content-class="space-y-3"
    :is-hoverable="false"
  >
    <div class="flex items-center gap-3">
      <h2 class="text-lg sm:text-2xl">最新动态</h2>
      <KunButton size="sm" variant="light" href="/activity">
        查看更多 >
      </KunButton>
    </div>

    <KunScrollShadow
      axis="vertical"
      shadow-size="3rem"
      class-name="max-h-[calc(100dvh-16rem)]"
    >
      <div
        v-for="(activity, index) in activities"
        :key="index"
        class="flex flex-col space-y-2"
      >
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
          <KunUser :disable-floating="true" size="sm" :user="activity.actor" />
          <span class="text-default-500 text-sm">
            {{ formatTimeDifference(activity.timestamp) }}
          </span>
        </div>

        <KunDivider class-name="mt-2" />
      </div>
    </KunScrollShadow>
  </KunCard>
</template>
