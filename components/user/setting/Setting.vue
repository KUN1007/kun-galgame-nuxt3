<script setup lang="ts">
import type { UserInfo } from '~/types/api/user'

defineProps<{
  user: UserInfo
}>()
</script>

<template>
  <div class="h-full w-full space-y-12">
    <UserSettingAvatar />
    <UserSettingBio :user="user" />
    <UserSettingUsername />
  </div>
</template>
