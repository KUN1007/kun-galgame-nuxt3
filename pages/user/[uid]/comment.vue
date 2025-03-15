<script setup lang="ts">
import type { UserInfo } from '~/types/api/user'

defineProps<{
  user: UserInfo
}>()
</script>

<template>
  <UserList>
    <UserComment :uid="user.uid" />

    <KunNull v-if="!user.comment" type="null" />
  </UserList>
</template>
