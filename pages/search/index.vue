<script setup lang="ts">
useHead({
  title: `搜索 Galgame, Galgame 资源, 话题, 用户, 回复, 评论 - ${kungal.titleShort}`,
  meta: [
    {
      name: 'description',
      content: '搜索 Galgame, Galgame 资源, 话题, 用户, 回复, 评论等'
    }
  ]
})
</script>

<template>
  <div class="root">
    <SearchContainer />
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
  color: var(--kungalgame-font-color-3);
  padding: 17px;
}

@media (max-width: 700px) {
  .root {
    margin: 0 5px;
    min-height: calc(100dvh - 63px);
  }
}
</style>
