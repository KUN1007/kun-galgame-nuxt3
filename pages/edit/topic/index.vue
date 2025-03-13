<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

useHead({ title: '发布话题' })
</script>

<template>
  <EditTopicContainer />
</template>
