<script setup lang="ts">
import { KUN_USER_PAGE_NAV_MAP } from '~/constants/user'
import type { GalgameResourceType, UserInfo } from '~/types/api/user'

const props = defineProps<{
  user: UserInfo
}>()
const route = useRoute()
const resourceType = computed(
  () => (route.params as { type: GalgameResourceType }).type
)

const count = computed(() => {
  return resourceType.value === 'valid'
    ? props.user.galgameResourceValid
    : props.user.galgameResourceInvalid
})

useKunDisableSeo(
  `${props.user.name}${KUN_USER_PAGE_NAV_MAP[resourceType.value]}`
)
</script>

<template>
  <UserResource :uid="user.uid" :type="resourceType" />

  <KunNull v-if="!count" />
</template>
