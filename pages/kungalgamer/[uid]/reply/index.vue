<script setup lang="ts">
import type { UserInfo } from '~/types/api/user'

const props = defineProps<{
  user: UserInfo
}>()
const reply = computed(() => props.user.reply)
</script>

<template>
  <KungalgamerList>
    <KungalgamerReply :reply="reply" />

    <KungalgamerEmpty v-if="!reply.length" />
  </KungalgamerList>
</template>
