<script setup lang="ts">
import dayjs from 'dayjs'

const props = defineProps<{
  reply: number[]
}>()

const { data } = await useFetch('/api/user/replies', {
  method: 'GET',
  query: { ridArray: props.reply },
  watch: false,
  ...kungalgameResponseHandler,
})
</script>

<template>
  <div class="reply" v-if="data">
    <div class="item" v-for="(reply, index) in data" :key="index">
      <NuxtLinkLocale :to="`/topic/${reply.tid}`">
        <div class="title">
          {{ markdownToText(reply.content) }}
        </div>
        <div class="time">
          {{ dayjs(reply.time).format('MM/DD/YYYY') }}
        </div>
      </NuxtLinkLocale>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.item {
  width: 100%;
  margin-top: 17px;
  border-radius: 10px;
  box-shadow: var(--shadow);
  cursor: pointer;

  a {
    border-radius: 10px;
    padding: 10px;
    height: 100%;
    color: var(--kungalgame-font-color-3);
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:hover {
      transition: all 0.2s;
      color: var(--kungalgame-white);
      background-color: var(--kungalgame-pink-4);
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
