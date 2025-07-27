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
  <KunTooltip
    class-name="flex"
    text="是否显示内容限制的游戏内容 (R18 等)"
    position="top"
  >
    <KunSwitch
      label="启用网站 NSFW 模式"
      :class-name="cn('flex-row-reverse w-full justify-end gap-3', className)"
      :label-class-name="cn('text-md text-default-500 ml-0', labelClass)"
      v-model="option"
    />
  </KunTooltip>
</template>
