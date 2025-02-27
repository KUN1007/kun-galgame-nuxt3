<script setup lang="ts">
useHead({
  title: `注册 - ${kungal.titleShort}`,
  meta: [
    {
      name: 'description',
      content:
        '注册 鲲 Galgame 论坛, 世界上最萌的 Galgame 论坛! Galgame 交流讨论, Galgame 技术交流。为营造最好的氛围而努力! 永远不会有广告! 永远免费!'
    }
  ]
})
</script>

<template>
  <div class="root">
    <Register />

    <KunFooter />
  </div>
</template>

<style lang="scss" scoped>
.root {
  flex-direction: column;
  height: 100%;
  min-height: calc(100dvh - 75px);
  max-width: 80rem;
  margin: 0 auto;
}
</style>
