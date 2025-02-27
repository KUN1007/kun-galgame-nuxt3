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
    <span v-if="type === 'null'">请填满这只萝莉吧, 因为这里空空如也</span>
    <span v-if="type === '404'">
      杂~~~鱼~♡杂鱼~♡ 臭杂鱼♡ 页面不见了 ~ 是不是被你吃了?!
    </span>
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
