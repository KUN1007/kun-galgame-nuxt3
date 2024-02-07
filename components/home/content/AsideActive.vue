<script setup lang="ts">
import { asideItem } from '../utils/asideItem'

const props = defineProps<{
  isActive: boolean
}>()
</script>

<template>
  <div class="item-box" v-if="props.isActive">
    <div class="new-article">
      <NuxtLink to="/edit">
        <button class="btn-new-article">
          {{ $t('mainPage.asideActive.create') }}
        </button>
      </NuxtLink>
    </div>

    <div class="item-box-container">
      <span v-if="asideItem.length" v-for="kun in asideItem" :key="kun.index">
        <NuxtLink :to="{ path: kun.router }">
          {{ $t(`mainPage.asideActive.${kun.name}`) }}
        </NuxtLink>
      </span>
    </div>
  </div>

  <HomeContentTopic v-if="props.isActive" />
</template>

<style lang="scss" scoped>
.item-box {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.new-article {
  width: 100%;
    height: 100%;
    width: 100%;
    background-color: var(--kungalgame-trans-blue-0);
    border: 1px solid var(--kungalgame-blue-4);
    border-radius: 5px;
    cursor: pointer;
    color: var(--kungalgame-blue-4);
    font-weight: bold;
    font-size: larger;
  }
}

.item-box-container {
  width: 100%;
  height: 80px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 2fr));
  grid-template-rows: repeat(2, minmax(0, 1fr));
  font-size: 14px;
  color: var(--kungalgame-font-color-3);
  position: relative;

  a {
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    color: var(--kungalgame-font-color-2);

    &:hover {
      transition: color 0.2s;
      color: var(--kungalgame-blue-4);
      cursor: pointer;
    }
  }
}
</style>
../utils/asideItem
