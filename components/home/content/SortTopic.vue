<script setup lang="ts">
import { sortItem } from '../utils/navItem'

const ascClass = ref('')

const { topic } = storeToRefs(useTempHomeStore())

const handleSortByField = (field: string) => {
  useTempHomeStore().resetHomePageStatus()
  topic.value.sortField = field
}

const orderAscending = () => {
  useTempHomeStore().resetHomePageStatus()
  topic.value.sortOrder = 'asc'
  ascClass.value = 'active'
}

const orderDescending = () => {
  useTempHomeStore().resetHomePageStatus()
  topic.value.sortOrder = 'desc'
  ascClass.value = ''
}

const iconMap: Record<string, string> = {
  updated: 'line-md:arrows-vertical',
  time: 'eos-icons:hourglass',
  popularity: 'bi:fire',
  views: 'ic:outline-remove-red-eye',
  likes_count: 'line-md:thumbs-up-twotone',
  replies_count: 'ri:reply-line',
  comments: 'fa-regular:comment-dots',
}
</script>

<template>
  <div class="container" :class="ascClass">
    <span>{{ $t('mainPage.header.filter') }}</span>
    <span class="filter">
      <Icon :name="iconMap[topic.sortField]" />
    </span>

    <div class="sort-container">
      <div class="sort-submenu">
        <div
          class="sort-item"
          v-for="kun in sortItem"
          :key="kun.index"
          @click="handleSortByField(kun.sortField)"
        >
          <span><Icon class="icon-item" :name="kun.icon" /></span>
          <span>{{ $t(`mainPage.header.${kun.name}`) }}</span>
        </div>

        <div class="sort-order">
          <span @click="orderAscending">
            <Icon name="tdesign:order-ascending" />
          </span>
          <span @click="orderDescending">
            <Icon name="tdesign:order-descending" />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  height: 100%;
  width: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1px;
  flex-grow: 1;
  position: relative;
  background-color: var(--kungalgame-trans-blue-0);
  border: 1px solid var(--kungalgame-blue-4);
  border-radius: 5px;
  cursor: pointer;
  margin-left: 7px;

  &:hover {
    transition: all 0.2s;
    border: 1px solid var(--kungalgame-blue-4);
    background-color: var(--kungalgame-blue-4);
    color: var(--kungalgame-white);

    & > span:nth-child(2) {
      color: var(--kungalgame-white);
    }
  }
}

.sort-container {
  width: 100%;
  top: 100%;
  position: absolute;
}

.filter {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  margin-left: 7px;
  color: var(--kungalgame-blue-4);
}

.sort-submenu {
  display: none;
  flex-direction: column;
  background-color: var(--kungalgame-trans-white-2);
  box-shadow: var(--shadow);
  border-radius: 5px;
}

.container:hover .sort-submenu {
  display: flex;
}

.sort-item {
  padding: 10px 0;
  font-size: 14px;
  color: var(--kungalgame-font-color-3);
  text-decoration: none;
  display: flex;
  justify-content: space-around;

  &:hover {
    background-color: var(--kungalgame-trans-blue-1);
    backdrop-filter: blur(5px);
  }

  &:active {
    background-color: var(--kungalgame-trans-blue-2);
  }

  &:first-child {
    border-radius: 5px 5px 0 0;
  }
}

.icon-item {
  color: var(--kungalgame-blue-4);
  padding-right: 3px;
  font-size: 20px;
}

.sort-order {
  width: 100%;
  display: flex;
  cursor: default;
  background-color: var(--kungalgame-trans-white-2);
  border-radius: 0 0 5px 5px;

  span {
    color: var(--kungalgame-blue-4);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 17px;
    padding: 10px 0;
    cursor: pointer;

    &:hover {
      transition: all 0.2s;
      color: var(--kungalgame-red-4);
    }

    &:nth-child(2) {
      border-left: 1px solid var(--kungalgame-trans-blue-4);
    }
  }
}

.active {
  border: 1px solid var(--kungalgame-pink-4);
  background-color: var(--kungalgame-pink-4);
  color: var(--kungalgame-white);

  & > span:nth-child(2) {
    color: var(--kungalgame-white);
  }

  .filter {
    color: var(--kungalgame-pink-4);
  }
}

@media (max-width: 700px) {
  .sort-item {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
</style>
../utils/navItem
