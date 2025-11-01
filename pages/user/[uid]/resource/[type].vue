<script setup lang="ts">
import {
  GALGAME_RESOURCE_NAV_CONFIG,
  type KUN_USER_PAGE_GALGAME_RESOURCE_TYPE
} from '~/constants/user'
import type { UserInfo } from '~/types/api/user'

const props = defineProps<{
  user: UserInfo
}>()

const route = useRoute()
const resourceType = computed(() => {
  const routeType =
    (route.params as { type: string }).type.replace(/-/g, '_') || 'valid'
  return routeType as (typeof KUN_USER_PAGE_GALGAME_RESOURCE_TYPE)[number]
})

useKunDisableSeo(
  `${props.user.name} 的${GALGAME_RESOURCE_NAV_CONFIG[resourceType.value].text}`
)
</script>

<template>
  <UserResource :uid="user.id" :type="resourceType" />
</template>
