<script setup lang="ts"></script>

<template>
  <div class="mode">
    <span>{{ $t('header.settings.mode') }}</span>
    <div class="mode-container">
      <span>
        <Icon
          class="sun"
          name="line-md:moon-filled-alt-to-sunny-filled-loop-transition"
          @click="$colorMode.preference = 'light'"
        />
      </span>

      <span>
        <Icon
          class="moon"
          name="line-md:sunny-outline-to-moon-loop-transition"
          @click="$colorMode.preference = 'dark'"
        />
      </span>

      <span>
        <Icon
          class="moon"
          name="line-md:light-dark-loop"
          @click="$colorMode.preference = 'system'"
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
  span:nth-child(3) {
    color: var(--kungalgame-purple-4);
  }
}
</style>
