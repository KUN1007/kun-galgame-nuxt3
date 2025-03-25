<script setup lang="ts">
import { KUN_USER_PAGE_NAV_MAP } from '~/constants/user'
import type { TopicType, UserInfo } from '@/types/api/user'

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

useKunSeoMeta({
  title: () =>
    `${props.user.name}${KUN_USER_PAGE_NAV_MAP[topicType.value]}的话题`,
  description: () =>
    `${props.user.name}在${kungal.titleShort}${KUN_USER_PAGE_NAV_MAP[topicType.value]}的话题`
})

useHead({
  link: [
    {
      rel: 'canonical',
      href: `${kungal.domain.main}/user/${props.user.uid}/topic/${topicType.value}`
    }
  ]
})
</script>

<template>
  <UserTopic :uid="user.uid" :type="topicType" />

  <KunNull v-if="!count" />
</template>
