<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

useKunSeoMeta({ title: '发布话题' })
</script>

<template>
  <EditTopicLayout />
</template>
