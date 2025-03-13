<script setup lang="ts"></script>

<template>
  <div class="space-y-3">
    <ClientOnly>
      <EditTopicTags />

      <EditTopicCategory />
      <EditTopicSection />

      <EditInfoNotice />

      <EditTopicButton />

      <NuxtLink to="/topic/1712">
        请不要在话题中发布除了 Galgame 以外的 R18 黄游 (例如: SLG) 资源
      </NuxtLink>
    </ClientOnly>
  </div>
</template>
