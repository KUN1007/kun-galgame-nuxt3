<script setup lang="ts">
import {
  COMMENT_NAV_CONFIG,
  type KUN_USER_PAGE_COMMENT_TYPE
} from '~/constants/user'
import type { UserInfo } from '~/types/api/user'

const props = defineProps<{
  user: UserInfo
}>()

const route = useRoute()
const commentType = computed(() => {
  const routeType =
    (route.params as { type: string }).type.replace(/-/g, '_') || 'valid'
  return routeType as (typeof KUN_USER_PAGE_COMMENT_TYPE)[number]
})

useKunDisableSeo(
  `${props.user.name}${COMMENT_NAV_CONFIG[commentType.value].text}`
)
</script>

<template>
  <UserComment :uid="user.id" :type="commentType" />
</template>
