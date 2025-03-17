<script setup lang="ts">
import type { UserInfo } from '~/types/api/user'

definePageMeta({
  middleware: 'auth'
})

defineProps<{
  user: UserInfo
}>()
</script>

<template>
  <UserSetting :user="user" />
</template>
