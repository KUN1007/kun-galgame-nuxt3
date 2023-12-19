<script setup lang="ts">
import type { UserInfo } from '~/types/api/user'

const props = defineProps<{
  user: UserInfo
}>()
const comment = computed(() => props.user.comment)
</script>

<template>
  <KungalgamerList>
    <KungalgamerComment :comment="comment" />

    <KungalgamerEmpty v-if="!comment.length" />
  </KungalgamerList>
</template>
