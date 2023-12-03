<script setup lang="ts">
import { Icon } from '@iconify/vue'

import { usePersistKUNGalgameHomeStore } from '@/store/modules/home'
import { useTempHomeStore } from '@/store/temp/home'
import { storeToRefs } from 'pinia'

const { searchHistory } = storeToRefs(usePersistKUNGalgameHomeStore())
const { search } = storeToRefs(useTempHomeStore())

const handleClickHistory = (index: number) => {
  search.value.keywords = searchHistory.value[index]
}

const clearSearchHistory = () => {
  searchHistory.value = []
}

const handleDeleteHistory = (historyIndex: number) => {
  searchHistory.value.splice(historyIndex, 1)
}
</script>

<template>
  <div class="history">
    <div class="title">
      <span>{{ $tm('mainPage.header.history') }}</span>
      <span @click="clearSearchHistory">
        {{ $tm('mainPage.header.clear') }}
      </span>
    </div>

    <div class="history-container" v-if="searchHistory.length">
      <div
        class="single-history"
        v-for="(history, index) in searchHistory"
        :key="index"
        @click="handleClickHistory(index)"
      >
        <span>{{ history }} </span>
        <span>
          <Icon
            @click="handleDeleteHistory(index)"
            class="delete"
            icon="line-md:close-circle"
          />
        </span>
      </div>
    </div>

    <span class="empty" v-if="!searchHistory.length">
      {{ $tm('mainPage.header.emptyHistory') }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
.history {
  width: 100%;
  top: 70px;
  left: 0;
  flex-direction: column;
  color: var(--kungalgame-font-color-3);
  border-radius: 7px;
}

.title {
  display: flex;
  margin: 10px;
  justify-content: space-between;

  span {
    font-size: 14px;
    &:nth-child(2) {
      cursor: pointer;

      &:hover {
        color: var(--kungalgame-blue-4);
      }
    }
  }
}

.history-container {
  display: flex;
  flex-direction: column;
  font-size: 13px;
  margin: 10px;
}

.single-history {
  width: 100%;
  display: flex;
  justify-content: space between;
  padding: 7px 3px;
  margin: 2px 0;

  &:hover {
    color: var(--kungalgame-blue-4);

    .delete {
      display: flex;
    }
  }

  span:nth-child(1) {
    cursor: default;
    position: relative;
    display: flex;
    overflow: hidden;
  }

  span:nth-child(2) {
    width: 17px;
  }
}

.delete {
  width: 30px;
  right: 5px;
  font-size: 17px;
  position: absolute;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: var(--kungalgame-font-color-0);
  display: none;
}

.empty {
  display: flex;
  justify-content: center;
  color: var(--kungalgame-blue-2);
  font-style: oblique;
}
</style>
