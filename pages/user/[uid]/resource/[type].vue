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

useKunSeoMeta({
  title: () => `${props.user.name}${KUN_USER_PAGE_NAV_MAP[resourceType.value]}`,
  description: () => `${props.user.name}发布的 Galgame 下载资源`
})

useHead({
  link: [
    {
      rel: 'canonical',
      href: `${kungal.domain.main}/user/${props.user.uid}/resource/${resourceType.value}`
    }
  ]
})
</script>

<template>
  <UserResource :uid="user.uid" :type="resourceType" />

  <KunNull v-if="!count" />
</template>
