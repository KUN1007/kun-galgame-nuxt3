<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useKUNGalgameSettingsStore } from '@/store/modules/settings'
</script>

<template>
  <div class="mode">
    <span>{{ $tm('header.settings.mode') }}</span>
    <div class="mode-container">
      <span>
        <Icon
          class="sun"
          icon="line-md:moon-filled-alt-to-sunny-filled-loop-transition"
          @click="useKUNGalgameSettingsStore().setKUNGalgameTheme('')"
        />
      </span>

      <span>
        <Icon
          class="moon"
          icon="line-md:sunny-outline-to-moon-loop-transition"
          @click="useKUNGalgameSettingsStore().setKUNGalgameTheme('dark')"
        />
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.mode {
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.mode-container {
  font-size: 25px;
  width: 60%;
  display: flex;
  justify-content: space-around;
  span {
    cursor: pointer;
  }
  span:nth-child(1) {
    color: var(--kungalgame-red-4);
  }
  span:nth-child(2) {
    color: var(--kungalgame-blue-4);
  }
}
</style>
