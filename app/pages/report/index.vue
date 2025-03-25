<script setup lang="ts">
useKunSeoMeta({
  title: '匿名举报',
  description: `${kungal.titleShort} 的举报页, 这里可以完全匿名的提交论坛内的违规记录, 希望大家不要违规`
})

useHead({
  link: [
    {
      rel: 'canonical',
      href: `${kungal.domain.main}/report`
    }
  ]
})
</script>

<template>
  <ReportContainer />
</template>
