<script setup lang="ts">
import type { UserInfo } from '~/types/api/user'

defineProps<{
  user: UserInfo
}>()
</script>

<template>
  <UserList>
    <UserComment :uid="user.uid" />

    <KunNull :condition="!user.comment" type="null" />
  </UserList>
</template>
