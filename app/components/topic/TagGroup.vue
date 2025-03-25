<script setup lang="ts">
const props = defineProps<{
  section: string[]
  tags: string[]
}>()
</script>

<template>
  <div class="flex flex-wrap items-center gap-2">
    <TopicDetailSection :section="props.section" />

    <template v-if="props.tags">
      <KunBadge v-for="(tag, index) in props.tags" :key="index">
        {{ tag }}
      </KunBadge>
    </template>
  </div>
</template>
