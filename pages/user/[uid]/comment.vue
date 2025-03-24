<script setup lang="ts">
import type { UserInfo } from '~/types/api/user'

const props = defineProps<{
  user: UserInfo
}>()

useKunSeoMeta({
  title: `${props.user.name} 发布的评论`,
  description: `${props.user.name} 在 ${kungal.titleShort} 发布的评论`
})

useHead({
  link: [
    {
      rel: 'canonical',
      href: `${kungal.domain.main}/user/${props.user.uid}/comment`
    }
  ]
})
</script>

<template>
  <UserComment :uid="user.uid" />

  <KunNull v-if="!user.comment" />
</template>
