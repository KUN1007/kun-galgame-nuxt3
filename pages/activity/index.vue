<script setup lang="ts">
const description = `动态时间线, 展示全站 话题, 回复, Galgame 与社区的最新 Galgame 资源, Galgame 动态, Galgame 讨论, Galgame 评论等`

useKunSeoMeta({
  title: '动态时间线',
  description
})
</script>

<template>
  <ActivityTimeline />
</template>
