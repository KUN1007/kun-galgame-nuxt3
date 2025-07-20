<script setup lang="ts">
import { KUN_TOPIC_SECTION } from '~/constants/topic'
import { KUN_TOPIC_SECTION_DESCRIPTION_MAP } from '~/constants/section'

const route = useRoute()
const section = computed(() => (route.params as { section: string }).section)

useKunSeoMeta({
  title: KUN_TOPIC_SECTION[section.value],
  description:
    KUN_TOPIC_SECTION_DESCRIPTION_MAP[section.value.toLocaleLowerCase()]
})
</script>

<template>
  <SectionContainer :section="section" />
</template>
