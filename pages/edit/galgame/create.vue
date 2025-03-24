<script setup lang="ts">
definePageMeta({
  middleware: ['auth', 'prevent']
})

useHead({ title: '发布 Galgame' })
</script>

<template>
  <EditGalgame />
</template>
