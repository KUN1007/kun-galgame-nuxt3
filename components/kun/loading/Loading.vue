<script setup lang="ts">
withDefaults(
  defineProps<{
    description?: string
  }>(),
  {
    description: '正在摸鱼中...咕咕咕'
  }
)
</script>

<template>
  <div class="m-auto flex flex-col items-center gap-3">
    <KunImage
      :custom="true"
      alt="loading"
      src="/kun.webp"
      class="h-48 w-48 rounded-lg"
    />
    <span>{{ description }}</span>
  </div>
</template>
