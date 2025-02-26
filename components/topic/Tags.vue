<script setup lang="ts">
defineProps<{
  tags: string[]
}>()
</script>

<template>
  <KunBadge v-if="tags.length">
    <span v-for="(tag, index) in tags" :key="index">
      {{ tag }}
    </span>
  </KunBadge>
</template>
