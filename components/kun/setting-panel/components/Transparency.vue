<script setup lang="ts">
const { showKUNGalgamePageTransparency } = storeToRefs(
  usePersistSettingsStore()
)

watch(
  () => showKUNGalgamePageTransparency.value,
  debounce(() => {
    usePersistSettingsStore().setKUNGalgameTransparency(
      showKUNGalgamePageTransparency.value
    )
  }, 300)
)
</script>

<template>
  <div class="space-y-2">
    <div class="flex justify-between">
      <span>页面透明度</span>
      <span>{{ showKUNGalgamePageTransparency }}%</span>
    </div>

    <div class="flex items-center">
      <span>10%</span>

      <KunSlider
        class="mx-4 w-full"
        :min="10"
        :max="90"
        :step="1"
        v-model="showKUNGalgamePageTransparency"
      />

      <span>90%</span>
    </div>
  </div>
</template>
