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
  <div>
    <div class="container">
      <span>页面透明度</span>
      <span>{{ showKUNGalgamePageTransparency }}%</span>
    </div>

    <div class="scroll">
      <span>10%</span>

      <KunSlider
        class="main"
        :min="10"
        :max="90"
        :step="1"
        v-model="showKUNGalgamePageTransparency"
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
  align-items: center;
}

.main {
  width: 100%;
  margin: 20px 10px;
}

.container {
  display: flex;
  justify-content: space-between;
}
</style>
