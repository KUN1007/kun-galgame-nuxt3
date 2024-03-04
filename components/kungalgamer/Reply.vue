<script setup lang="ts">
import dayjs from 'dayjs'

const props = defineProps<{
  reply: number[]
}>()

const { data } = await useFetch('/api/user/replies', {
  method: 'GET',
  query: { ridArray: props.reply },
  watch: false,
  ...kungalgameResponseHandler
})
</script>

<template>
  <div class="reply" v-if="data">
    <div class="item" v-for="(replyData, index) in data" :key="index">
      <NuxtLinkLocale :to="`/topic/${replyData.tid}`">
        <div class="title">
          {{ markdownToText(replyData.content) }}
        </div>
        <div class="time">
          {{ dayjs(replyData.time).format('MM/DD/YYYY') }}
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
      color: var(--kungalgame-white);
      background-color: var(--kungalgame-blue-5);
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
