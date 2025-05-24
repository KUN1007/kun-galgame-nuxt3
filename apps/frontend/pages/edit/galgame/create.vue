<script setup lang="ts">
definePageMeta({
  middleware: ['auth', 'prevent']
})

useKunSeoMeta({ title: '发布 Galgame' })
</script>

<template>
  <EditGalgame />
</template>
