<script setup lang="ts">
withDefaults(
  defineProps<{
    description?: string
    isShowSticker?: boolean
  }>(),
  {
    description: '请填满这只萝莉吧, 因为这里空空如也',
    isShowSticker: true
  }
)
</script>

<template>
  <div class="m-auto flex flex-col items-center gap-3">
    <KunImage
      v-if="isShowSticker"
      :src="getRandomSticker(description || '').value"
      class="h-32 w-32 rounded-2xl"
      loading="lazy"
      placeholder="/apple-touch-icon.png"
      alt="blank galgame"
    />
    <span>{{ description }}</span>
  </div>
</template>
