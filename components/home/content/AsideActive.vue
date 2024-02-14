<script setup lang="ts">
import { asideItem } from '../utils/asideItem'

const props = defineProps<{
  isActive: boolean
}>()
</script>

<template>
  <div class="item" v-if="props.isActive">
    <span v-if="asideItem.length" v-for="kun in asideItem" :key="kun.index">
      <NuxtLink :to="{ path: kun.router }">
        <Icon class="icon" :name="kun.icon" />
        {{ $t(`mainPage.asideActive.${kun.name}`) }}
      </NuxtLink>
    </span>
  </div>

  <HomeContentTopic v-if="props.isActive" />
</template>

<style lang="scss" scoped>
.item {
  width: 100%;
  height: 150px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 2fr));
  grid-template-rows: repeat(3, minmax(0, 1fr));
  gap: 17px;
  font-size: 14px;
  background-color: var(--kungalgame-trans-white-5);
  margin-bottom: 17px;
  color: var(--kungalgame-font-color-3);
  box-shadow: var(--kungalgame-shadow-0);
  border-radius: 10px;
  padding: 17px;
  backdrop-filter: blur(10px);

  a {
    font-weight: bold;
    text-wrap: nowrap;
    display: flex;
    justify-content: space-around;
    align-items: center;
    overflow: hidden;
    height: 100%;
    width: 100%;
    color: var(--kungalgame-font-color-2);
    border-bottom: 2px solid var(--kungalgame-trans-white-9);

    .icon {
      color: var(--kungalgame-blue-5);
      font-size: 20px;
      margin-right: 10px;
    }

    &:hover {
      border-bottom: 2px solid var(--kungalgame-blue-5);
    }
  }
}
</style>
