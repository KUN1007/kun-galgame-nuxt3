<script setup lang="ts">
import type { UserInfo } from '@/types/api/user'

definePageMeta({
  middleware: 'auth'
})

defineProps<{
  user: UserInfo
}>()

useKunSeoMeta({
  title: '信息设置'
})
</script>

<template>
  <UserSetting :user="user" />
</template>
