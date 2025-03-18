<script setup lang="ts">
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
</script>

<template>
  <UserGalgame :uid="user.uid" :type="galgameType" />

  <KunNull v-if="!count" type="null" />
</template>
