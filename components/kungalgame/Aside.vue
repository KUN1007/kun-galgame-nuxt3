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
  border-left: 5px solid var(--kungalgame-blue-5);
  margin-right: 17px;
  padding: 17px;

  @include kun-blur;

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
    text-decoration: none;
    text-underline-offset: 3px;

    .icon {
      font-size: 20px;
      margin-right: 10px;
    }

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
