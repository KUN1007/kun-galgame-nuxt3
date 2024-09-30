<script setup lang="ts">
definePageMeta({
  layout: 'message',
  middleware: 'auth'
})

const route = useRoute()

const uid = computed(() => {
  return parseInt((route.params as { uid: string }).uid)
})
</script>

<template>
  <div>{{ uid }}</div>
</template>

<style lang="scss" scoped></style>
