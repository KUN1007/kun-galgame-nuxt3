<script setup lang="ts">
interface Mode {
  name: string
  icon: string
}

const modeItem: Mode[] = [
  {
    name: 'light',
    icon: 'line-md:moon-filled-alt-to-sunny-filled-loop-transition'
  },
  {
    name: 'dark',
    icon: 'line-md:sunny-outline-to-moon-loop-transition'
  },
  {
    name: 'system',
    icon: 'line-md:light-dark-loop'
  }
]
</script>

<template>
  <div class="mode">
    <span>{{ $t('header.settings.mode') }}</span>
    <div class="mode-container">
      <span
        v-for="(mode, index) in modeItem"
        :key="index"
        :class="$colorMode.preference === mode.name ? 'active' : ''"
      >
        <Icon
          class="sun"
          :name="mode.icon"
          @click="$colorMode.preference = mode.name"
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
  align-items: center;

  span {
    display: flex;
    cursor: pointer;
    align-items: center;
    padding-bottom: 2px;
  }

  span:nth-child(1) {
    color: var(--kungalgame-red-4);
  }

  span:nth-child(2) {
    color: var(--kungalgame-blue-5);
  }

  span:nth-child(3) {
    color: var(--kungalgame-purple-4);
  }
}

.active {
  border-bottom: 2px solid var(--kungalgame-blue-5);
}
</style>
