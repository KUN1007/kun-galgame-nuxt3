<script setup lang="ts">
import dayjs from 'dayjs'

const props = defineProps<{
  tidArray: number[]
}>()

const { data } = await useFetch('/api/user/topics', {
  method: 'GET',
  query: { tidArray: props.tidArray },
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

.title {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
