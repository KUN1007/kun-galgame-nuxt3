<script setup lang="ts">
withDefaults(
  defineProps<{
    description?: string
    type?: 'null' | '404'
    isShowSticker?: boolean
  }>(),
  {
    description: '',
    type: 'null',
    isShowSticker: true
  }
)
</script>

<template>
  <div class="m-auto flex flex-col items-center gap-3">
    <NuxtImg
      v-if="isShowSticker"
      :src="useRandomSticker"
      class="h-32 w-32 rounded-lg"
      loading="lazy"
      placeholder="/apple-touch-icon.png"
    />
    <span v-if="description">{{ description }}</span>
    <span v-if="type === 'null'">请填满这只萝莉吧, 因为这里空空如也</span>
    <span v-if="type === '404'">
      杂~~~鱼~♡杂鱼~♡ 臭杂鱼♡ 页面不见了 ~ 是不是被你吃了?!
    </span>
  </div>
</template>
