<script setup lang="ts">
import type { UserInfo } from '~/types/api/user'

const props = defineProps<{
  user: UserInfo
}>()

useKunDisableSeo(`${props.user.name} 发布的评论`)
</script>

<template>
  <UserComment :uid="user.uid" />

  <KunNull v-if="!user.comment" />
</template>
