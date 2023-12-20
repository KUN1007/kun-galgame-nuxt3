<script setup lang="ts">
import { computed } from 'vue'
import { asideItem } from '../utils/asideItem'

import { useKUNGalgameSettingsStore } from '@/store/modules/settings'
import { storeToRefs } from 'pinia'

const { showKUNGalgameLanguage } = storeToRefs(useKUNGalgameSettingsStore())

// Calculate page style based on the current language
const langClass = computed(() => {
  return showKUNGalgameLanguage.value === 'en' ? 'en' : 'cn'
})
</script>

<template>
  <div class="aside">
    <span v-for="kun in asideItem" :key="kun.index">
      <RouterLink :class="langClass" :to="{ path: kun.router }">
        {{ $t(`mainPage.asideActive.${kun.name}`) }}
      </RouterLink>
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
    font-size: 18px;
    border-top: 1px solid var(--kungalgame-blue-4);

    &:first-child {
      border-top: none;
    }

    &:hover {
      transition: 0.2s;
      background-color: var(--kungalgame-trans-blue-1);
    }

    a {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--kungalgame-blue-5);
    }
  }
}

.en {
  writing-mode: vertical-lr;
  text-orientation: sideways;
  transform: rotate(180deg);
}

.cn {
  writing-mode: vertical-rl;
  text-orientation: upright;
}
</style>
../utils/asideItem
