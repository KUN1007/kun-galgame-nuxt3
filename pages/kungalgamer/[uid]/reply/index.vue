<script setup lang="ts">
import type { UserInfo } from '~/types/api/user'

defineProps<{
  user: UserInfo
}>()
</script>

<template>
  <KungalgamerList>
    <KungalgamerReply :uid="user.uid" />

    <KungalgamerEmpty v-if="!user.reply" />
  </KungalgamerList>
</template>
