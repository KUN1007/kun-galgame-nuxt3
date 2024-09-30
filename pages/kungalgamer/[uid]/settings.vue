<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

import type { UserInfo } from '~/types/api/user'

const props = defineProps<{
  user: UserInfo
}>()
const user = computed(() => props.user)
</script>

<template>
  <div class="settings">
    <KungalgamerAvatar />

    <KungalgamerBio :user="user" />

    <KungalgamerUsername />
  </div>
</template>

<style lang="scss" scoped>
.settings {
  width: 100%;
  height: 100%;
  padding: 10px 17px;
}
</style>
