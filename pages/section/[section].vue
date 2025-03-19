<script setup lang="ts">
import { KUN_TOPIC_SECTION_DESCRIPTION_MAP } from '~/constants/section'

const route = useRoute()
const section = computed(() => (route.params as { section: string }).section)

useHead({
  title: `话题分类 - ${kungal.titleShort}`,
  meta: [
    {
      name: 'description',
      content:
        KUN_TOPIC_SECTION_DESCRIPTION_MAP[section.value.toLocaleLowerCase()]
    }
  ]
})
</script>

<template>
  <SectionContainer :section="section" />
</template>
