<script setup lang="ts">
import dayjs from 'dayjs'

const props = defineProps<{
  tidArray: number[]
}>()

const { data } = await useFetch('/api/user/topics', {
  method: 'GET',
  query: { tidArray: props.tidArray },
  watch: false,
  ...kungalgameResponseHandler,
})
</script>

<template>
  <div class="topic" v-if="tidArray.length">
    <div class="item" v-for="(topic, index) in data" :key="index">
      <NuxtLink :to="`/topic/${topic.tid}`">
        <div class="title">
          {{ topic.title }}
        </div>
        <div class="time">
          {{ dayjs(topic.time).format('YYYY/MM/DD') }}
        </div>
      </NuxtLink>
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
