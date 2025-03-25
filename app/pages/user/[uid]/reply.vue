<script setup lang="ts">
import type { UserInfo } from '@/types/api/user'

const props = defineProps<{
  user: UserInfo
}>()

useKunSeoMeta({
  title: `${props.user.name} 发布的回复`,
  description: `${props.user.name} 在 ${kungal.titleShort} 发布的回复`
})

useHead({
  link: [
    {
      rel: 'canonical',
      href: `${kungal.domain.main}/user/${props.user.uid}/reply`
    }
  ]
})
</script>

<template>
  <UserReply :uid="user.uid" />

  <KunNull v-if="!user.reply" />
</template>
