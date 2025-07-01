<script setup lang="ts">
const { showKUNGalgameContentLimit } = storeToRefs(usePersistSettingsStore())

const isNSFWEnable = computed(
  () =>
    showKUNGalgameContentLimit.value === 'nsfw' ||
    showKUNGalgameContentLimit.value === 'all'
)
const description = isNSFWEnable.value
  ? '网站已启用 NSFW, 杂鱼~♡ 臭杂鱼♡, 请注意您周围没有人'
  : '网站未启用 NSFW, 部分 Galgame 不可见, 要查看所有 Galgame, 请在网站右上角打开 NSFW'
</script>

<template>
  <KunCard
    :is-hoverable="false"
    :is-transparent="false"
    :color="isNSFWEnable ? 'danger' : 'warning'"
  >
    <div class="flex items-center gap-2">
      <KunIcon
        :class="
          cn('h-5 w-5', isNSFWEnable ? 'text-danger' : 'text-warning-600')
        "
        :name="isNSFWEnable ? 'lucide:ban' : 'lucide:shield-check'"
      />
      <p>{{ description }}</p>
    </div>
  </KunCard>
</template>
