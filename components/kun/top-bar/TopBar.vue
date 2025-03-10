<script setup lang="ts">
const { showKUNGalgamePanel } = storeToRefs(useTempSettingStore())
</script>

<template>
  <div class="fixed z-50 mb-3 w-full shrink-0 md:pr-3 md:pl-68">
    <div
      class="bg-background border-default-300 mx-auto flex h-16 w-full max-w-7xl items-center justify-between rounded-b-lg border px-3 shadow"
    >
      <span>占位文本</span>
      <KunTopBarAvatar />
    </div>
  </div>
</template>
