<script setup lang="ts">
import { topicSortItem, topicIconMap } from './navSortItem'

const { topic } = storeToRefs(useTempRankingStore())
const isAscending = ref(false)

const { data } = await useFetch(`/api/ranking/topic`, {
  method: 'GET',
  query: topic,
  ...kungalgameResponseHandler
})

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
    <div class="title">{{ $t('ranking.topic.name') }}</div>
    <div class="nav">
      <div class="order" @click="handleClickSortOrder">
        <Transition name="order" mode="out-in">
          <div v-if="isAscending">
            <span>{{ $t('ranking.asc') }}</span>
            <Icon class="icon" name="lucide:arrow-up" />
          </div>
          <div v-else-if="!isAscending">
            <span>{{ $t('ranking.desc') }}</span>
            <Icon class="icon" name="lucide:arrow-down" />
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
            <span>{{ $t(`ranking.topic.${kun.name}`) }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="container" v-if="data">
      <RankingTopic :field="topic.sortField" :topics="data" />
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
  color: var(--kungalgame-blue-5);
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
  border: 1px solid var(--kungalgame-blue-5);
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
  border-left: 1px solid var(--kungalgame-blue-5);
}

.sort:hover .submenu {
  display: flex;
}

.icon {
  color: var(--kungalgame-blue-5);
}

.submenu {
  top: 40px;
  position: absolute;
  width: 100%;
  display: none;
  flex-direction: column;
  border-radius: 5px;
  border: 1px solid var(--kungalgame-blue-2);
  box-shadow: var(--shadow);
  background-color: var(--kungalgame-trans-white-5);
  backdrop-filter: blur(10px);
  will-change: transform;

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
  height: calc(100dvh - 75px - 160px);
  border-top: none;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0;
  }
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
