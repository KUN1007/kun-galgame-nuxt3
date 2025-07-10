<script setup lang="ts">
import {
  TOPIC_NAV_CONFIG,
  type KUN_USER_PAGE_TOPIC_TYPE
} from '~/constants/user'
import type { UserInfo } from '~/types/api/user'

const props = defineProps<{
  user: UserInfo
}>()

const route = useRoute()
const topicType = computed(() => {
  const routeType =
    (route.params as { type: string }).type.replace(/-/g, '_') || 'topic'
  return routeType as (typeof KUN_USER_PAGE_TOPIC_TYPE)[number]
})

useKunDisableSeo(
  `${props.user.name}${TOPIC_NAV_CONFIG[topicType.value].text}的话题`
)
</script>

<template>
  <UserTopic :uid="user.id" :type="topicType" />
</template>
