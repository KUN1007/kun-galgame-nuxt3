<script setup lang="ts">
const props = defineProps<{
  src: string
}>()
</script>

<template>
  <Teleport to="#teleports">
    <img
      class="fixed top-0 left-0 h-full w-full object-cover brightness-[var(--kun-background-brightness)]"
      :src="props.src"
    />
  </Teleport>
</template>
