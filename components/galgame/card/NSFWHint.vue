<script setup lang="ts">
const { showKUNGalgameContentLimit } = storeToRefs(usePersistSettingsStore())

const isNSFWEnable = computed(
  () =>
    showKUNGalgameContentLimit.value === 'nsfw' ||
    showKUNGalgameContentLimit.value === 'all'
)
const description = isNSFWEnable.value
  ? '网站已启用 NSFW, 杂鱼~♡ 臭杂鱼♡, 请注意您周围没有人'
  : '网站未启用 NSFW, 部分 Galgame 不可见, 要查看所有 Galgame, 请在网站右上角设置打开 NSFW'
</script>

<template>
  <KunInfo
    :title="isNSFWEnable ? '网站已进入全面涩涩模式' : '部分 Galgame 已被隐藏'"
    :color="isNSFWEnable ? 'danger' : 'warning'"
    :description="description"
    :icon="isNSFWEnable ? 'lucide:ban' : 'lucide:shield-check'"
  />
</template>
