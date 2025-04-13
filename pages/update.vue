<script setup lang="ts">
import { kunUpdateLogTabItem } from '~/constants/update'

useHead({
  title: '更新记录',
  meta: [
    {
      name: '更新记录',
      content:
        '鲲 Galgame 论坛开源 GitHub 仓库的更新记录, 记录了 Galgame 论坛从零到一的一切'
    }
  ]
})

const activeTab = computed(
  () => useRoute().fullPath.split('/').pop() || 'history'
)
</script>

<template>
  <div class="flex flex-col space-y-3">
    <KunTab :items="kunUpdateLogTabItem" :model-value="activeTab" size="sm" />
    <NuxtPage />
  </div>
</template>
