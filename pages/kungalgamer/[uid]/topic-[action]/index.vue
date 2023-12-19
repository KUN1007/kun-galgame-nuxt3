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
  return []
})
</script>

<template>
  <div class="article">
    <KungalgamerTopic :tid-array="tidArray" />

    <div v-if="!tidArray.length" class="null">
      {{ $t('user.profile.null') }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.article {
  width: 100%;
  padding: 7px 17px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: inline;
    width: 4px;
    height: 0;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--kungalgame-blue-4);
    border-radius: 2px;
  }

  scrollbar-width: thin;
  scrollbar-color: var(--kungalgame-blue-4) var(--kungalgame-blue-1);
}

.null {
  margin: auto;
  color: var(--kungalgame-blue-2);
  font-style: oblique;
}
</style>
