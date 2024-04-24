<script setup lang="ts">
import type { TopicType, UserInfo } from '~/types/api/user'

const props = defineProps<{
  user: UserInfo
}>()
const route = useRoute()
const action = computed(() => (route.params as { action: TopicType }).action)

const tidArray = computed(() => {
  if (action.value === 'publish') {
    return props.user.topic
  }
  if (action.value === 'like') {
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
    <KungalgamerTopic :uid="user.uid" :type="action" />

    <KungalgamerEmpty v-if="!tidArray" />
  </KungalgamerList>
</template>
