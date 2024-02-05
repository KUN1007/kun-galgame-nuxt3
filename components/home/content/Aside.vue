<script setup lang="ts">
import { asideItem } from '../utils/asideItem'
</script>

<template>
  <div class="aside">
    <span
      v-for="kun in asideItem"
      :key="kun.index"
      v-tooltip="{
        message: $t(`mainPage.asideActive.${kun.name}`),
        position: 'right',
      }"
    >
      <NuxtLink
        :aria-label="$t(`mainPage.asideActive.${kun.name}`)"
        :to="{ path: kun.router }"
      >
        <Icon :name="kun.icon" />
      </NuxtLink>
    </span>
  </div>
</template>

<style lang="scss" scoped>
.aside {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border: 1px solid var(--kungalgame-blue-4);
  border-radius: 5px;

  span {
    width: 100%;
    height: 1px;
    flex-grow: 1;
    font-size: 25px;
    border-top: 1px solid var(--kungalgame-blue-4);

    &:first-child {
      border-top: none;
    }

    a {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--kungalgame-blue-5);
    }

    &:hover {
      transition: 0.2s;
      background-color: var(--kungalgame-blue-4);

      a {
        color: var(--kungalgame-white);
      }
    }
  }
}
</style>
