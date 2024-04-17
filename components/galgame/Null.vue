<script setup lang="ts">
const handleClickContribute = () => {
  useMessage(
    'Please click the edit button to the right of "Favorite"',
    '请点击收藏右边的编辑按钮',
    'info'
  )
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
