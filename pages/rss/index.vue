<script setup lang="ts">
useHead({
  title: `Galgame 和话题订阅 - ${kungal.titleShort}`,
  meta: [
    {
      name: 'description',
      content: '鲲 Galgame 论坛最新 Galgame 和话题的订阅, 支持英语及中文'
    }
  ]
})
</script>

<template>
  <RssContainer />
</template>
