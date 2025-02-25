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

const sectionColors: Record<string, { bg: string; text: string }> = {
  g: {
    bg: 'bg-primary-100',
    text: 'text-primary-800'
  },
  t: {
    bg: 'bg-success-100',
    text: 'text-success-800'
  },
  o: {
    bg: 'bg-secondary-100',
    text: 'text-secondary-800'
  }
}

const getSectionStyle = (section: string) => {
  const key = section.toLowerCase()[0]
  return (
    sectionColors[key] || { bg: 'bg-default-100', text: 'text-default-800' }
  )
}
</script>

<template>
  <span class="flex gap-1">
    <span
      v-for="(sec, index) in section"
      :key="index"
      :class="[
        getSectionStyle(sec).bg,
        getSectionStyle(sec).text,
        'inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium'
      ]"
    >
      <Icon :name="iconMap[sec.toLowerCase()[0]]" class="h-3 w-3" />
      {{ KUN_TOPIC_SECTION[sec] }}
    </span>
  </span>
</template>
