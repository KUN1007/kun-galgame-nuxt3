<script setup lang="ts">
const handleClickContribute = () => {
  useMessage(10534, 'info')
}
</script>

<template>
  <div class="null">
    <span>{{ $t('galgame.null') }}</span>
    <span @click="handleClickContribute">
      {{ ` ${$t('galgame.welcome')}` }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
.null {
  font-size: small;
  color: var(--kungalgame-font-color-0);
  font-style: oblique;

  span {
    &:last-child {
      cursor: pointer;
      color: var(--kungalgame-blue-5);
    }
  }
}
</style>
