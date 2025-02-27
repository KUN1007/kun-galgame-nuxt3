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
  <div
    v-tooltip="{
      message: '该设置项可能会使网站在低性能设备卡顿',
      position: 'bottom'
    }"
  >
    <div class="container">
      <span>页面模糊度</span>
      <span>{{ showKUNGalgameBackgroundBlur }}px</span>
    </div>

    <div class="scroll">
      <span>0px</span>
      <KunSlider
        class="main"
        :min="0"
        :max="17"
        :step="1"
        v-model="showKUNGalgameBackgroundBlur"
      />
      <span>17px</span>
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
