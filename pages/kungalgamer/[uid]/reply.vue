<script setup lang="ts">
definePageMeta({
  layout: 'kungalgamer'
})

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
