<script setup lang="ts">
import { asideItem } from '../utils/asideItem'

const localePath = useLocalePath()
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
        :to="localePath({ path: kun.router })"
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
  border-radius: 20px;
  background-color: var(--kungalgame-trans-white-5);
  box-shadow: var(--kungalgame-shadow-0);

  span {
    width: 100%;
    height: 1px;
    flex-grow: 1;
    font-size: 25px;
    border-top: 2px solid var(--kungalgame-blue-5);

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
      background-color: var(--kungalgame-blue-5);

      &:first-child {
        border-radius: 20px 20px 0 0;
      }

      &:last-child {
        border-radius: 0 0 20px 20px;
      }

      a {
        color: var(--kungalgame-white);
      }
    }
  }
}
</style>
