<script setup lang="ts">
import type {
  UserInfo,
  UserTopic,
  UserReply,
  UserComment,
} from '~/types/api/user'
import dayjs from 'dayjs'

const props = defineProps<{
  user: UserInfo
}>()
const user = computed(() => props.user)

const { data } = await useFetch('/api/user/replies', {
  method: 'GET',
  query: { ridArray: user.value.reply },
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
    <div class="reply" v-if="data">
      <div class="item" v-for="(reply, index) in data" :key="index">
        <NuxtLink :to="`/topic/${reply.tid}`">
          <div class="title">
            {{ markdownToText(reply.content) }}
          </div>
          <div class="time">
            {{ dayjs(reply.time).format('YYYY/MM/DD') }}
          </div>
        </NuxtLink>
      </div>
    </div>

    <div v-if="!data?.length" class="null">
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

.reply,
.comment {
  .item {
    border-bottom: 1px solid var(--kungalgame-red-1);
    border-left: 2px solid var(--kungalgame-red-3);
    &:hover {
      border-bottom: 1px solid var(--kungalgame-red-3);
      background-color: var(--kungalgame-trans-red-1);
    }
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
