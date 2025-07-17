<script setup lang="ts">
const route = useRoute()

const domain = computed(() => {
  return (route.params as { domain: string }).domain
})
</script>

<template>
  <WebsiteDetailContainer :domain="domain" />
</template>
