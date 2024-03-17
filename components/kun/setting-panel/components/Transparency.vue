<script setup lang="ts">
const colorMode = useColorMode()
const { showKUNGalgamePageTransparency } = storeToRefs(
  useKUNGalgameSettingsStore()
)

watch(
  () => [showKUNGalgamePageTransparency.value, colorMode.value],
  debounce(() => {
    useKUNGalgameSettingsStore().setKUNGalgameTransparency(
      showKUNGalgamePageTransparency.value,
      colorMode.value as 'dark' | 'light'
    )
  }, 300)
)
</script>

<template>
  <div>
    <div class="container">
      <span>{{ $t('header.settings.trans') }}</span>
      <span>{{ showKUNGalgamePageTransparency }}%</span>
    </div>

    <div class="scroll">
      <span>10%</span>
      <input
        class="main"
        min="10"
        max="90"
        step="1"
        type="range"
        v-model="showKUNGalgamePageTransparency"
        @touchmove.stop.passive
      />
      <span>90%</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.scroll {
  width: 100%;
  font-size: 15px;
  display: flex;

  span {
    margin-top: 15px;
  }
}

.main {
  width: 100%;
  height: 10px;
  margin: 20px 0;
}

.container {
  display: flex;
  justify-content: space-between;
}
</style>
