<script setup lang="ts">
import {
  KUN_TOPIC_PAGE_SORT_FIELD,
  KUN_TOPIC_CATEGORY
} from '~/constants/topic'
import { pageData } from './pageData'

const { layout } = storeToRefs(usePersistPoolStore())
</script>

<template>
  <div class="tool">
    <div class="sort">
      <KunSelect
        :styles="{ width: '100px' }"
        :options="['created', 'views']"
        :default-value="pageData.sortField"
        @set="(value) => (pageData.sortField = value as 'views' | 'created')"
        position="bottom"
      >
        <span>{{ KUN_TOPIC_PAGE_SORT_FIELD[pageData.sortField] }}</span>
      </KunSelect>

      <KunSelect
        :styles="{ width: '150px' }"
        :options="['all', 'galgame', 'technique', 'others']"
        :default-value="pageData.category"
        @set="
          (value) =>
            (pageData.category = value as
              | 'all'
              | 'galgame'
              | 'technique'
              | 'others')
        "
        position="bottom"
      >
        <span>{{ KUN_TOPIC_CATEGORY[pageData.category] }}</span>
      </KunSelect>
    </div>

    <div class="func">
      <span :class="layout === 'grid' ? 'active' : ''" @click="layout = 'grid'">
        <Icon class="icon" name="lucide:layout-grid" />
      </span>
      <span :class="layout === 'list' ? 'active' : ''" @click="layout = 'list'">
        <Icon class="icon" name="lucide:list" />
      </span>
      <span
        :class="pageData.sortOrder === 'asc' ? 'active' : ''"
        @click="pageData.sortOrder = 'asc'"
      >
        <Icon class="icon" name="lucide:arrow-up" />
      </span>
      <span
        :class="pageData.sortOrder === 'desc' ? 'active' : ''"
        @click="pageData.sortOrder = 'desc'"
      >
        <Icon class="icon" name="lucide:arrow-down" />
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tool {
  padding: 10px;
  color: var(--kungalgame-font-color-3);
  box-shadow: var(--shadow);
  background-color: var(--kungalgame-trans-white-5);
  border-radius: 10px;
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  z-index: 17;

  .sort {
    display: flex;
  }

  .icon {
    font-size: 20px;
  }

  .func {
    display: flex;
    white-space: nowrap;

    & > span {
      display: flex;
      cursor: pointer;
      padding: 3px 10px;
      margin-right: 5px;
      border-radius: 10px;
    }

    .active {
      box-shadow: var(--shadow);
      color: var(--kungalgame-blue-5);
    }
  }
}

@media (max-width: 700px) {
  .tool {
    .sort {
      margin-bottom: 8px;
    }

    .icon {
      font-size: 16px;
    }
  }
}
</style>
