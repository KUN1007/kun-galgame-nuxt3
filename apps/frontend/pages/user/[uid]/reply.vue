<script setup lang="ts">
import type { UserInfo } from '~/types/api/user'

const props = defineProps<{
  user: UserInfo
}>()

useKunDisableSeo(`${props.user.name} 发布的回复`)
</script>

<template>
  <UserReply :uid="user.uid" />

  <KunNull v-if="!user.reply" />
</template>
