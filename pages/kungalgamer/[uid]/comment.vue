<script setup lang="ts">
import type { UserInfo } from '~/types/api/user'

defineProps<{
  user: UserInfo
}>()
</script>

<template>
  <KungalgamerList>
    <KungalgamerComment :uid="user.uid" />

    <KunNull :condition="!user.comment" type="null" />
  </KungalgamerList>
</template>
