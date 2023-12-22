<script setup lang="ts">
import { categoryItem } from '../utils/navItem'

const { topic } = storeToRefs(useTempHomeStore())
const categoryIcon = ref('galgame')

const handleSortByCategory = (name: string) => {
  useTempHomeStore().resetHomePageStatus()
  topic.value.category = []
  categoryIcon.value = name

  const capitalizeFirstLetter = name.charAt(0).toUpperCase() + name.slice(1)
  topic.value.category.push(capitalizeFirstLetter)
}

const iconMap: Record<string, string> = {
  galgame: 'icon-park-outline:game',
  technique: 'mingcute:tool-line',
  others: 'basil:other-1-outline',
}
</script>

<template>
  <div class="nav-article">
    <div class="category">
      <span>{{ $t('mainPage.header.category') }}</span>
      <span><Icon :name="iconMap[categoryIcon]" /></span>

      <div class="category-container">
        <div class="category-submenu">
          <div
            class="item"
            v-for="(kun, _) in categoryItem"
            :key="kun.index"
            @click="handleSortByCategory(kun.name)"
          >
            <span><Icon class="icon-item" :name="kun.icon" /></span>
            <span>
              {{ $t(`mainPage.header.${kun.name}`) }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <HomeContentSortTopic />

    <RouterLink to="/pool" class="more">
      <span>{{ $t('mainPage.header.all') }}</span>
      <Icon class="all-topic" name="line-md:chevron-triple-right" />
    </RouterLink>
  </div>
</template>

<style lang="scss" scoped>
.nav-article {
  width: 100%;
  height: 40px;
  display: flex;
  flex-shrink: 0;
  color: var(--kungalgame-font-color-3);
  z-index: 1;
}

.category {
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

  & > span:nth-child(2) {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    margin-left: 7px;
    color: var(--kungalgame-blue-4);
  }

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

.category-container {
  width: 100%;
  top: 40px;
  position: absolute;
}

.category-submenu {
  display: none;
  flex-direction: column;
  background-color: var(--kungalgame-trans-white-2);
  box-shadow: var(--shadow);
  border-radius: 5px;

  .item {
    padding: 10px 0;
    font-size: 14px;
    color: var(--kungalgame-font-color-3);
    text-decoration: none;
    display: flex;
    justify-content: space-around;
    cursor: pointer;

    &:hover {
      background-color: var(--kungalgame-trans-blue-1);
      backdrop-filter: blur(5px);
    }

    &:active {
      background-color: var(--kungalgame-trans-blue-2);
    }

    .icon-item {
      color: var(--kungalgame-blue-4);
      padding-right: 3px;
      font-size: 20px;
    }

    &:first-child {
      border-radius: 5px 5px 0 0;
    }

    &:last-child {
      border-radius: 0 0 5px 5px;
    }
  }
}

.category:hover .category-submenu {
  display: flex;
}

.more {
  height: 100%;
  width: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  background-color: var(--kungalgame-trans-blue-0);
  border: 1px solid var(--kungalgame-blue-4);
  flex-grow: 1;
  border-radius: 5px;
  cursor: pointer;
  color: var(--kungalgame-font-color-3);
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

.all-topic {
  font-size: 18px;
  margin-left: 7px;
}

@media (max-width: 1000px) {
  .more {
    display: none;
  }
}
</style>
../utils/navItem
