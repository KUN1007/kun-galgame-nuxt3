<script setup lang="ts">
import { KUN_TOPIC_SECTION } from '~/constants/topic'
import type { KunUIColor, KunUISize } from '~/components/kun/ui/type'

defineProps<{
  section: string[]
  size?: KunUISize
}>()

const iconMap: Record<string, string> = {
  g: 'lucide:gamepad-2',
  t: 'lucide:drafting-compass',
  o: 'lucide:circle-ellipsis'
}

const sectionColors: Record<string, KunUIColor> = {
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
      :size="size"
    >
      <Icon :name="iconMap[sec.toLowerCase()[0]]" class="size-4 text-inherit" />
      {{ KUN_TOPIC_SECTION[sec] }}
    </KunBadge>
  </span>
</template>
