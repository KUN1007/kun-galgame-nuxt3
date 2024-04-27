<script setup lang="ts">
import { asideBarItem } from './asideItem'
</script>

<template>
  <div class="aside">
    <span class="skip" v-for="kun in asideBarItem" :key="kun.index">
      <NuxtLinkLocale
        style="color: var(--kungalgame-blue-5)"
        :to="{ path: kun.router }"
        :aria-label="kun.label"
      >
        <Icon class="icon" :name="kun.icon"></Icon>
        {{ $t(`kungalgame.${kun.name}`) }}
      </NuxtLinkLocale>
    </span>
  </div>
</template>

<style lang="scss" scoped>
.aside {
  height: 100%;
  color: var(--kungalgame-font-color-3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: var(--kungalgame-trans-white-5);
  backdrop-filter: blur(10px);
  will-change: transform;
  border-left: 5px solid var(--kungalgame-blue-5);
  box-shadow: var(--kungalgame-shadow-0);
  border-radius: 10px;
  margin-right: 17px;
  padding: 17px;

  & > span {
    display: flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
  }
}

.skip {
  width: 100%;
  height: 100%;
  color: var(--kungalgame-blue-5);

  a {
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 2px solid var(--kungalgame-trans-blue-2);

    .icon {
      font-size: 20px;
      margin-right: 10px;
    }

    &:hover {
      border-bottom: 2px solid var(--kungalgame-blue-5);
    }
  }
}
</style>
