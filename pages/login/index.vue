<script setup lang="ts">
useHead({
  title: `登录 - ${kungal.titleShort}`,
  meta: [
    {
      name: 'description',
      content: '登录 鲲 Galgame 论坛, 世界上最萌的 Galgame 论坛! 欢迎回家!'
    }
  ]
})
</script>

<template>
  <div class="root">
    <Login />

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
  @include kun-center;
}
</style>
