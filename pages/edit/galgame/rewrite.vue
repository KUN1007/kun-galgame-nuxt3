<script setup lang="ts">
definePageMeta({
  middleware: ['auth', 'prevent']
})

useKunSeoMeta({ title: '重新编辑 Galgame' })
</script>

<template>
  <EditGalgamePrPullRequest />
</template>
