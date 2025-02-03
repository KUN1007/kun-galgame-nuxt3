<script setup lang="ts">
useHead({
  title: '主页',
  meta: [
    {
      name: 'description',
      content: kungal.description
    }
  ]
})
</script>

<template>
  <div class="root">
    <HomeContainer />
  </div>
</template>

<style lang="scss" scoped>
.root {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: calc(100dvh - 75px);
  max-width: 80rem;
  margin: 0 auto;
  padding: 17px;

  @include kun-blur;
}

@media (max-width: 1000px) {
  .root {
    min-height: calc(100dvh - 63px);
    padding: 17px 10px;
  }
}
</style>
