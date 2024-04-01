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
  likes: 'line-md:thumbs-up-twotone',
  replies: 'ri:reply-line',
  comments: 'fa-regular:comment-dots'
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
          :class="topic.sortField === kun.sortField ? 'item-active' : ''"
          v-for="kun in sortItem"
          :key="kun.index"
          @click="handleSortByField(kun.sortField)"
        >
          <span><Icon class="icon-item" :name="kun.icon" /></span>
          <span>{{ $t(`mainPage.header.${kun.name}`) }}</span>
        </div>

        <div class="sort-order">
          <span :class="ascClass ? 'order-active' : ''" @click="orderAscending">
            <Icon name="tdesign:order-ascending" />
          </span>
          <span
            :class="ascClass ? '' : 'order-active'"
            @click="orderDescending"
          >
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
  border-radius: 5px;
  cursor: pointer;
  margin-left: 7px;

  &:hover {
    transition: all 0.2s;
    background-color: var(--kungalgame-blue-5);
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
  color: var(--kungalgame-blue-5);
}

.sort-submenu {
  display: none;
  flex-direction: column;
  background-color: var(--kungalgame-trans-white-5);
  backdrop-filter: blur(5px);
  box-shadow: var(--shadow);
  border-radius: 5px;
  overflow: hidden;
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

  &:first-child {
    border-radius: 5px 5px 0 0;
  }
}

.icon-item {
  color: var(--kungalgame-blue-5);
  padding-right: 3px;
  font-size: 20px;
}

.sort-order {
  width: 100%;
  display: flex;
  cursor: default;
  color: var(--kungalgame-blue-5);
  border-radius: 0 0 5px 5px;

  span {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 17px;
    padding: 10px 0;
    cursor: pointer;
  }
}

.active {
  background-color: var(--kungalgame-blue-5);
  color: var(--kungalgame-white);

  & > span:nth-child(2) {
    color: var(--kungalgame-white);
  }

  .filter {
    color: var(--kungalgame-pink-4);
  }
}

.item-active {
  background-color: var(--kungalgame-trans-blue-1);
  backdrop-filter: blur(5px);
}

.order-active {
  background-color: var(--kungalgame-blue-5);
  color: var(--kungalgame-white);
}

@media (max-width: 700px) {
  .sort-item {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
</style>
