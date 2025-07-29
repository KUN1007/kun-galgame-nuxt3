<script setup lang="ts">
import { kunUpdateLogTabItem } from '~/constants/update'

const activeTab = computed(
  () => useRoute().fullPath.split('/').pop() || 'history'
)
</script>

<template>
  <div class="flex flex-col space-y-3">
    <KunTab
      :items="kunUpdateLogTabItem"
      inner-class-name="bg-background"
      :model-value="activeTab"
      size="sm"
    />
    <NuxtPage />
  </div>
</template>
