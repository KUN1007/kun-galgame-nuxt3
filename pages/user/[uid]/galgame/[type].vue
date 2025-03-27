<script setup lang="ts">
import { KUN_USER_PAGE_NAV_MAP } from '~/constants/user'
import type { GalgameType, UserInfo } from '~/types/api/user'

const props = defineProps<{
  user: UserInfo
}>()
const route = useRoute()
const galgameType = computed(() => (route.params as { type: GalgameType }).type)

const count = computed(() => {
  if (galgameType.value === 'publish') {
    return props.user.galgame
  }
  if (galgameType.value === 'like') {
    return props.user.likeGalgame
  }
  if (galgameType.value === 'favorite') {
    return props.user.favoriteGalgame
  }
  if (galgameType.value === 'contribute') {
    return props.user.contributeGalgame
  }
  return []
})

useKunSeoMeta({
  title: () =>
    `${props.user.name}${KUN_USER_PAGE_NAV_MAP[galgameType.value]}的 Galgame`,
  description: () =>
    `${props.user.name}在${kungal.titleShort}${KUN_USER_PAGE_NAV_MAP[galgameType.value]}的 Galgame`
})

useHead({
  link: [
    {
      rel: 'canonical',
      href: `${kungal.domain.main}/user/${props.user.uid}/galgame/${galgameType.value}`
    }
  ]
})
</script>

<template>
  <UserGalgame :uid="user.uid" :type="galgameType" />

  <KunNull v-if="!count" />
</template>
