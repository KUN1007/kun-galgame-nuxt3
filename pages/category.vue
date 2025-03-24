<script setup lang="ts">
import { kunCategoryAvailableItem } from '~/constants/category'

const activeTab = computed(
  () => useRoute().fullPath.split('/').pop() || 'galgame'
)
</script>

<template>
  <div class="flex flex-col space-y-3">
    <KunTab
      :items="kunCategoryAvailableItem"
      :model-value="activeTab"
      inner-class-name="shadow border"
      size="sm"
    />
    <NuxtPage />
  </div>
</template>
