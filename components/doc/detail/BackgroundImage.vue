<script setup lang="ts">
const props = defineProps<{
  src: string
}>()
</script>

<template>
  <Teleport to="#teleports">
    <div class="bg-primary-50 fixed top-0 left-0 h-full w-full">
      <div class="bg-primary-50 fixed top-0 left-0 h-full w-full opacity-30">
        <KunImage class="h-full w-full object-cover" :src="props.src" />
      </div>
    </div>
  </Teleport>
</template>
