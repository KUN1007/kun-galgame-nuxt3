<script setup lang="ts">
const props = defineProps<{
  src: string
}>()
</script>

<template>
  <Teleport to="#teleports">
    <img
      class="fixed top-0 left-0 h-full w-full object-cover brightness-50 dark:brightness-30"
      :src="props.src"
    />
  </Teleport>
</template>
