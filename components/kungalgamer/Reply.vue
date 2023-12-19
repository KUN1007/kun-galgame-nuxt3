<script setup lang="ts">
import dayjs from 'dayjs'

const props = defineProps<{
  reply: number[]
}>()

const { data } = await useFetch('/api/user/replies', {
  method: 'GET',
  query: { ridArray: props.reply },
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
  <div class="reply" v-if="data">
    <div class="item" v-for="(reply, index) in data" :key="index">
      <NuxtLink :to="`/topic/${reply.tid}`">
        <div class="title">
          {{ markdownToText(reply.content) }}
        </div>
        <div class="time">
          {{ dayjs(reply.time).format('MM/DD/YYYY') }}
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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

.reply {
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
</style>
