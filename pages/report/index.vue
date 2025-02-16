<script setup lang="ts">
useHead({
  title: `匿名举报 - ${kungal.titleShort}`,
  meta: [
    {
      name: 'description',
      content:
        '鲲 Galgame 论坛的举报页，这里可以提交论坛内的违规记录，希望大家不要违规'
    }
  ]
})
</script>

<template>
  <div class="root">
    <Report />
  </div>
</template>

<style lang="scss" scoped>
.root {
  height: 100%;
  min-height: calc(100dvh - 75px);
}

@media (max-width: 700px) {
  .root {
    min-height: calc(100dvh - 63px);
  }
}
</style>
