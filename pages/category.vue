<script setup lang="ts">
import { KUN_TOPIC_CATEGORY } from '~/constants/topic'
import { KUN_CATEGORY_DESCRIPTION_MAP } from '~/constants/category'

const activeTab = computed(
  () => useRoute().fullPath.split('/').pop() || 'galgame'
)
</script>

<template>
  <KunCard
    :is-hoverable="false"
    :is-pressable="false"
    :is-transparent="false"
    class-name="h-full"
    content-class="space-y-3 justify-start"
  >
    <KunHeader
      :name="KUN_TOPIC_CATEGORY[activeTab]"
      :description="KUN_CATEGORY_DESCRIPTION_MAP[activeTab]"
    />

    <NuxtPage />
  </KunCard>
</template>
