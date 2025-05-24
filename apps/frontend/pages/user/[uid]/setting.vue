<script setup lang="ts">
import type { UserInfo } from '~/types/api/user'

definePageMeta({
  middleware: 'auth'
})

defineProps<{
  user: UserInfo
}>()

useKunDisableSeo('信息设置')
</script>

<template>
  <UserSetting :user="user" />
</template>
