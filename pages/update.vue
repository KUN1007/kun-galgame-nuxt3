<script setup lang="ts">
import { kunUpdateLogTabItem } from '~/constants/update'

const activeTab = computed(
  () => useRoute().fullPath.split('/').pop() || 'history'
)
</script>

<template>
  <KunCard
    :is-transparent="false"
    :is-hoverable="false"
    :is-pressable="false"
    content-class="space-y-3"
  >
    <KunTab :items="kunUpdateLogTabItem" :model-value="activeTab" size="sm" />
    <NuxtPage />
  </KunCard>
</template>
