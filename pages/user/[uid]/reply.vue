<script setup lang="ts">
import type { UserInfo } from '~/types/api/user'

defineProps<{
  user: UserInfo
}>()
</script>

<template>
  <UserList>
    <UserReply :uid="user.uid" />

    <KunNull :condition="!user.reply" type="null" />
  </UserList>
</template>
