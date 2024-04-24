<script setup lang="ts">
import type { TopicType, UserInfo } from '~/types/api/user'

const props = defineProps<{
  user: UserInfo
}>()
const route = useRoute()
const topicType = computed(
  () => (route.params as { type: string }).type as TopicType
)

const count = computed(() => {
  if (topicType.value === 'publish') {
    return props.user.topic
  }
  if (topicType.value === 'like') {
    return props.user.likeTopic
  }
  if (topicType.value === 'upvote') {
    return props.user.upvoteTopic
  }
  if (topicType.value === 'favorite') {
    return props.user.favoriteTopic
  }
  return []
})
</script>

<template>
  <KungalgamerList>
    <KungalgamerTopic :uid="user.uid" :type="topicType" />

    <KungalgamerEmpty v-if="!count" />
  </KungalgamerList>
</template>
