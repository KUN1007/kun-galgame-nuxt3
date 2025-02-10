<script setup lang="ts">
const handleClickContribute = () => {
  useMessage(10534, 'info')
}
</script>

<template>
  <div class="null">
    <span>该条目暂时为空</span>
    <span @click="handleClickContribute">欢迎贡献条目</span>
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
