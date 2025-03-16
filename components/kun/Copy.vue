<script setup lang="ts">
withDefaults(defineProps<{ text: string; name?: string }>(), {
  name: ''
})
</script>

<template>
  <KunButton variant="light" class-name="gap-2" @click="useKunCopy(text)">
    <span>{{ decodeIfEncoded(name ? name : text) }}</span>
    <Icon name="lucide:copy" />
  </KunButton>
</template>
