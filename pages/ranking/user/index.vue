<script setup lang="ts">
useHead({
  title: `排行榜单 - ${kungal.titleShort}`,
  meta: [
    {
      name: 'description',
      content: '鲲 Galgame 排行榜单, 用户排行, 话题排行, 萌萌点排行'
    }
  ]
})
</script>

<template>
  <RankingUser />
</template>
