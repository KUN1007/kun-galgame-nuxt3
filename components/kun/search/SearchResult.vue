<script setup lang="ts">
import type { SearchTopic } from '~/types/api/home'

const router = useRouter()
const { searchHistory } = storeToRefs(usePersistKUNGalgameHomeStore())
const { search, isShowSearch } = storeToRefs(useTempHomeStore())

const props = defineProps<{
  topics: SearchTopic[]
}>()

const topics = computed(() => props.topics)

const handleClickTopic = (tid: number) => {
  router.push(`/topic/${tid}`)
  if (!searchHistory.value.includes(search.value.keywords)) {
    searchHistory.value.push(search.value.keywords)
  }
  isShowSearch.value = false
}
</script>

<template>
  <div class="result">
    <div
      v-for="(topic, index) in topics"
      :key="index"
      :to="`/topic/${topic.tid}`"
      class="topic"
      @click="handleClickTopic(topic.tid)"
    >
      <span class="title">{{ topic.title }}</span>
      <span class="content">{{ topic.content }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.result {
  width: 100%;
  top: 70px;
  left: 0;
  display: flex;
  flex-direction: column;

  .topic {
    color: var(--kungalgame-font-color-3);
    border: 2px solid var(--kungalgame-trans-blue-2);
    background-color: var(--kungalgame-trans-blue-0);
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 17px;
    cursor: pointer;

    &:first-child {
      margin-top: 10px;
    }

    &:hover {
      border: 2px solid var(--kungalgame-blue-5);
    }
  }

  span {
    &:nth-child(1) {
      white-space: wrap;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      overflow: hidden;
      -webkit-box-orient: vertical;
      color: var(--kungalgame-blue-5);
      margin-bottom: 10px;
    }

    &:nth-child(2) {
      white-space: wrap;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      overflow: hidden;
      -webkit-box-orient: vertical;
    }
  }
}
</style>
