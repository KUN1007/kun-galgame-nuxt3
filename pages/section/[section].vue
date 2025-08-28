<script setup lang="ts">
import { KUN_TOPIC_SECTION } from '~/constants/topic'
import { KUN_TOPIC_SECTION_DESCRIPTION_MAP } from '~/constants/section'

const route = useRoute()
const section = computed(() => (route.params as { section: string }).section)

const KUN_TOPIC_CATEGORY: Record<string, string> = {
  g: 'Galgame',
  t: '技术交流',
  o: '其它话题'
}

useKunSeoMeta({
  title: `${KUN_TOPIC_CATEGORY[section.value.slice(0, 1)]} - ${KUN_TOPIC_SECTION[section.value]}`,
  description:
    KUN_TOPIC_SECTION_DESCRIPTION_MAP[section.value.toLocaleLowerCase()]
})
</script>

<template>
  <SectionContainer :section="section" />
</template>
