<script setup lang="ts">
const { fold } = storeToRefs(usePersistKUNGalgameHomeStore())
</script>

<template>
  <div class="bg-background flex justify-between gap-3 rounded-lg p-3">
    <div class="w-full space-y-12">
      <HomeTopicContainer v-if="fold.topics" />

      <HomeGalgameContainer v-if="fold.galgames" />

      <KunHeader :size="2">
        <template #header>
          <div class="header">
            <span>最新 Galgame 资源</span>
            <span class="suffix" @click="fold.resources = !fold.resources">
              {{ fold.resources ? '折叠板块' : '展开板块' }}
            </span>
          </div>
        </template>
      </KunHeader>
      <HomeResourceContainer v-if="fold.resources" />

      <HomeFooter />
    </div>

    <HomeRecent v-if="fold.updates" />
  </div>
</template>
