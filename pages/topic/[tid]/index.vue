<script setup lang="ts">
const route = useRoute()
const tid = computed(() => {
  return parseInt((route.params as { tid: string }).tid)
})
</script>

<template>
  <h1>Topic: {{ tid }}</h1>
</template>

<style lang="scss" scoped></style>
