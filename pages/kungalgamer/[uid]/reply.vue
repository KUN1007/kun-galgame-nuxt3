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

    <KunNull :condition="!user.reply" type="null" />
  </KungalgamerList>
</template>
