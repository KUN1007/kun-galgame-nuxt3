<script setup lang="ts">
import type { UserInfo } from '~/types/api/user'

defineProps<{
  user: UserInfo
}>()
</script>

<template>
  <UserReply :uid="user.uid" />

  <KunNull v-if="!user.reply" />
</template>
