<script setup lang="ts">
import {
  GALGAME_NAV_CONFIG,
  type KUN_USER_PAGE_GALGAME_TYPE
} from '~/constants/user'
import type { UserInfo } from '~/types/api/user'

const props = defineProps<{
  user: UserInfo
}>()

const route = useRoute()
const galgameType = computed(() => {
  const routeType =
    (route.params as { type: string }).type.replace(/-/g, '_') || 'galgame'
  return routeType as (typeof KUN_USER_PAGE_GALGAME_TYPE)[number]
})

useKunDisableSeo(
  `${props.user.name}${GALGAME_NAV_CONFIG[galgameType.value].text}的 Galgame`
)
</script>

<template>
  <UserGalgame :uid="user.id" :type="galgameType" />
</template>
