<script setup lang="ts">
import dayjs from 'dayjs'
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

const { data } = await useFetch('/api/user/topics', {
  method: 'GET',
  query: { tidArray: tidArray.value },
  watch: false,
  onResponse({ request, response, options }) {
    if (response.status === 233) {
      kungalgameErrorHandler(response.statusText)
      return
    }
  },
})
</script>

<template>
  <div class="article">
    <div class="topic" v-if="tidArray.length">
      <div class="item" v-for="(topic, index) in data" :key="index">
        <RouterLink :to="`/topic/${topic.tid}`">
          <div class="title">
            {{ topic.title }}
          </div>
          <div class="time">
            {{ dayjs(topic.time).format('YYYY/MM/DD') }}
          </div>
        </RouterLink>
      </div>
    </div>

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

.item {
  transition: all 0.2s;
  width: 100%;
  height: 30px;
  padding: 2px 5px;
  margin: 5px 0;
  border-bottom: 1px solid var(--kungalgame-blue-1);
  border-left: 2px solid var(--kungalgame-blue-4);
  cursor: pointer;
  a {
    height: 100%;
    color: var(--kungalgame-font-color-3);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &:hover {
    border-bottom: 1px solid var(--kungalgame-blue-4);
    background-color: var(--kungalgame-trans-blue-1);
  }
}

.title {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.null {
  margin: auto;
  color: var(--kungalgame-blue-2);
  font-style: oblique;
}
</style>
