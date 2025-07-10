<script setup lang="ts">
import type { UserInfo } from '~/types/api/user'

const props = defineProps<{
  user: UserInfo
}>()

useKunSeoMeta({
  title: `${props.user.name} 的主页`,
  description: `${props.user.name} 的信息, ${props.user.bio}`
})

useHead({
  link: [
    {
      rel: 'canonical',
      href: `${kungal.domain.main}/user/${props.user.id}/info`
    }
  ]
})
</script>

<template>
  <UserInfo :user="user" />
</template>
