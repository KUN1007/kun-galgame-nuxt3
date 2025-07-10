<script setup lang="ts">
import {
  REPLY_NAV_CONFIG,
  type KUN_USER_PAGE_REPLY_TYPE
} from '~/constants/user'
import type { UserInfo } from '~/types/api/user'

const props = defineProps<{
  user: UserInfo
}>()

const route = useRoute()
const replyType = computed(() => {
  const routeType =
    (route.params as { type: string }).type.replace(/-/g, '_') || 'valid'
  return routeType as (typeof KUN_USER_PAGE_REPLY_TYPE)[number]
})

useKunDisableSeo(`${props.user.name}${REPLY_NAV_CONFIG[replyType.value].text}`)
</script>

<template>
  <UserReply :uid="user.id" :type="replyType" />
</template>
