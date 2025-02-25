<script setup lang="ts">
const props = defineProps<{
  tags: string[]
  isShowIcon: boolean
}>()
</script>

<template>
  <span v-if="tags.length" class="flex flex-wrap items-center gap-1">
    <Icon
      v-if="isShowIcon"
      name="lucide:tags"
      class="text-default-600 h-4 w-4"
    />
    <span
      v-for="(tag, index) in tags"
      :key="index"
      class="text-default-600 bg-default-100 rounded-full px-2 py-1 text-xs font-medium"
    >
      {{ tag }}
    </span>
  </span>
</template>
