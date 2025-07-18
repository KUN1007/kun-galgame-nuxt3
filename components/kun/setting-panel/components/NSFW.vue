<script setup lang="ts">
withDefaults(
  defineProps<{
    className?: string
    labelClass?: string
  }>(),
  {
    className: '',
    labelClass: ''
  }
)

const { showKUNGalgameContentLimit } = storeToRefs(usePersistSettingsStore())

const option = ref(showKUNGalgameContentLimit.value === 'nsfw')

watch(
  () => option.value,
  () => {
    const optionString = option.value ? 'nsfw' : 'sfw'
    showKUNGalgameContentLimit.value = optionString
    location.reload()
  }
)
</script>

<template>
  <div :class="cn('ml-auto flex gap-3', className)">
    <span :class="cn('text-default-500', labelClass)">是否显示 NSFW 游戏</span>
    <KunTooltip
      class-name="flex"
      text="是否显示内容限制的游戏内容 (R18 等)"
      position="bottom"
    >
      <KunSwitch v-model="option" />
    </KunTooltip>
  </div>
</template>
