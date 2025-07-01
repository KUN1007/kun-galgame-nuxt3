<script setup lang="ts">
const description = `${kungal.titleShort} 动态页面, 本页面记录了所有 Galgame 资源 wiki 的变化, 论坛的动态, 回复, 评论等等, Galgame 资源区的评论, Galgame 资源贡献信息`

useKunSeoMeta({
  title: '站内动态',
  description
})

useHead({
  link: [
    {
      rel: 'canonical',
      href: `${kungal.domain.main}/activity`
    }
  ]
})
</script>

<template>
  <ActivityContainer />
</template>
