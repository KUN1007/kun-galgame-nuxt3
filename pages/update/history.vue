<script setup lang="ts">
useKunSeoMeta({
  title: '更新历史',
  description: `${kungal.titleShort} 更新历史, 记录了 ${kungal.titleShort} GitHub 开源仓库的所有更新信息, 可以前往 ${kungal.github} 查看更多开源详情`
})

useHead({
  link: [
    {
      rel: 'canonical',
      href: `${kungal.domain.main}/update/history`
    }
  ]
})
</script>

<template>
  <UpdateHistory />
</template>
