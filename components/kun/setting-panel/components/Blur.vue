<script setup lang="ts">
const { showKUNGalgameBackgroundBlur } = storeToRefs(usePersistSettingsStore())

watch(
  () => showKUNGalgameBackgroundBlur.value,
  debounce(() => {
    usePersistSettingsStore().setKUNGalgameBackgroundBlur(
      showKUNGalgameBackgroundBlur.value
    )
  }, 300)
)
</script>

<template>
  <div class="space-y-2">
    <div class="flex justify-between">
      <span>页面模糊度</span>
      <span>{{ showKUNGalgameBackgroundBlur }}px</span>
    </div>

    <div class="flex w-full items-center">
      <span>0px</span>
      <KunSlider
        class="mx-4 w-full"
        :min="0"
        :max="17"
        :step="1"
        v-model="showKUNGalgameBackgroundBlur"
      />
      <span>17px</span>
    </div>
  </div>
</template>
