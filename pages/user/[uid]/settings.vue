<script setup lang="ts">
import type { UserInfo } from '~/types/api/user'

definePageMeta({
  middleware: 'auth'
})

const props = defineProps<{
  user: UserInfo
}>()
const user = computed(() => props.user)
</script>

<template>
  <div class="settings">
    <UserAvatar />

    <UserBio :user="user" />

    <UserUsername />
  </div>
</template>

<style lang="scss" scoped>
.settings {
  width: 100%;
  height: 100%;
  padding: 10px 17px;
}
</style>
