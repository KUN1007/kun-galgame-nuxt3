<script setup lang="ts">
definePageMeta({
  middleware: ['auth', 'prevent']
})
</script>

<template>
  <EditGalgamePrPullRequest />
</template>
