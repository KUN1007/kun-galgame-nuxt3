<script setup lang="ts">
import { topicSortItem, topicIconMap } from './navSortItem'

const { topic } = storeToRefs(useTempRankingStore())
const isAscending = ref(false)

const getTopics = async () => {
  const data = await useFetch(`/api/ranking/topic`, {
    method: 'GET',
    query: {
      page: topic.value.page,
      limit: topic.value.limit,
      sortField: topic.value.sortField,
      sortOrder: topic.value.sortOrder,
    },
    watch: false,
    onResponse({ request, response, options }) {
      if (response.status === 233) {
        kungalgameErrorHandler(response.statusText)
        return
      }
    },
  })
  return data
}

const { data: topics } = await getTopics()

watch(
  () => topic.value,
  async () => {
    const newTopics = await getTopics()
    topics.value = newTopics.data.value
  },
  { deep: true }
)

const handleClickSortOrder = () => {
  isAscending.value = !isAscending.value
  if (isAscending.value) {
    topic.value.sortOrder = 'asc'
  } else {
    topic.value.sortOrder = 'desc'
  }
}
</script>

<template>
  <div class="topic">
    <div class="title">{{ $t('ranking.topic') }}</div>
    <div class="nav">
      <div class="order" @click="handleClickSortOrder">
        <Transition name="order" mode="out-in">
          <div v-if="isAscending">
            <span>{{ $t('ranking.asc') }}</span>
            <Icon class="icon" name="line-md:arrow-small-up" />
          </div>
          <div v-else-if="!isAscending">
            <span>{{ $t('ranking.desc') }}</span>
            <Icon class="icon" name="line-md:arrow-small-down" />
          </div>
        </Transition>
      </div>

      <div class="sort">
        <Icon class="icon" :name="topicIconMap[topic.sortField]" />
        <span>{{ $t('ranking.filter') }}</span>
        <div class="submenu">
          <div
            class="item"
            v-for="kun in topicSortItem"
            :key="kun.index"
            @click="topic.sortField = kun.sortField"
          >
            <span><Icon class="icon" :name="kun.icon" /></span>
            <span>{{ $t(`ranking.${kun.name}`) }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="container" v-if="topics">
      <RankingTopic :field="topic.sortField" :topics="topics" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.topic {
  width: 50%;
  height: calc(100% - 50px - 20px - 40px);
}

.title {
  font-size: 27px;
  color: var(--kungalgame-blue-4);
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.nav {
  height: 40px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-left: 10px;
  border: 1px solid var(--kungalgame-blue-4);
  border-radius: 5px;
}

.order {
  width: 100%;
  height: 100%;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;

  .icon {
    font-size: 22px;
  }

  & > div {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}

.sort {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
  border-left: 1px solid var(--kungalgame-blue-4);
}

.sort:hover .submenu {
  display: flex;
}

.icon {
  color: var(--kungalgame-blue-4);
}

.submenu {
  top: 40px;
  position: absolute;
  width: 100%;
  display: none;
  flex-direction: column;
  border-radius: 5px;
  border: 1px solid var(--kungalgame-blue-1);
  box-shadow: var(--shadow);
  background-color: var(--kungalgame-trans-white-5);
  backdrop-filter: blur(5px);

  .item {
    transition: all 0.2s;
    height: 40px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    &:hover {
      background-color: var(--kungalgame-trans-blue-1);
    }
  }
}

.container {
  height: 100%;
  border-top: none;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
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

.order-enter-active,
.order-leave-active {
  transition: all 0.25s ease-out;
}

.order-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.order-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

@media (max-width: 700px) {
  .topic {
    width: 100%;
  }

  .title {
    font-size: 23px;
  }
}
</style>
