<script setup lang="ts">
import { KUN_TOPIC_SECTION } from '~/constants/topic'

defineProps<{
  section: string[]
}>()

const iconMap: Record<string, string> = {
  g: 'lucide:gamepad-2',
  t: 'lucide:drafting-compass',
  o: 'lucide:circle-ellipsis'
}

const sectionColors: Record<string, string> = {
  g: 'primary',
  t: 'success',
  o: 'secondary'
}
</script>

<template>
  <span class="flex gap-1">
    <KunBadge
      v-for="(sec, index) in section"
      :key="index"
      :color="sectionColors[sec.toLowerCase()[0]]"
    >
      <Icon :name="iconMap[sec.toLowerCase()[0]]" class="size-4 text-inherit" />
      {{ KUN_TOPIC_SECTION[sec] }}
    </KunBadge>
  </span>
</template>
