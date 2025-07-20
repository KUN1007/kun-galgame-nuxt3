<script setup lang="ts">
useKunSeoMeta({
  title: '话题排行',
  description: `${kungal.titleShort} 话题排行, 查看关于 Galgame 话题的浏览数, 点赞数, 回复数, 评论数排行, 浏览最多人关注的 Galgame 话题`
})
</script>

<template>
  <RankingTopic />
</template>
