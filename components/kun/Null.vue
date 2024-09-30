<script setup lang="ts">
withDefaults(
  defineProps<{
    condition: boolean
    type: 'null' | '404'
    isShowSticker?: boolean
  }>(),
  {
    isShowSticker: true
  }
)
</script>

<template>
  <div class="kun-null" v-if="condition">
    <NuxtImg
      v-if="isShowSticker"
      :src="useRandomSticker"
      loading="lazy"
      placeholder="/apple-touch-icon.png"
    />
    <span v-if="type === 'null'">{{ $t('Null.null') }}</span>
    <span v-if="type === '404'">{{ $t('pageError.404') }}</span>
  </div>
</template>

<style lang="scss" scoped>
.kun-null {
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 150px;
    height: 150px;
    margin: 10px 0;
  }

  span {
    color: var(--kungalgame-pink-4);
    font-weight: bold;
    text-align: center;
  }
}
</style>
