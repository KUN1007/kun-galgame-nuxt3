<script setup lang="ts">
import type { UserInfo } from '~/types/api/user'

const props = defineProps<{
  user: UserInfo
}>()
const route = useRoute()
const action = computed(() => (route.params as { action: string }).action)

const tidArray = computed(() => {
  if (action.value === 'published') {
    return props.user.topic
  }
  if (action.value === 'liked') {
    return props.user.likeTopic
  }
  if (action.value === 'upvote') {
    return props.user.upvoteTopic
  }
  if (action.value === 'favorite') {
    return props.user.favoriteTopic
  }
  return []
})
</script>

<template>
  <KungalgamerList>
    <KungalgamerTopic :tid-array="tidArray" />

    <KungalgamerEmpty v-if="!tidArray.length" />
  </KungalgamerList>
</template>
