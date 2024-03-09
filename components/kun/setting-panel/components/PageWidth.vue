<script setup lang="ts">
const $colorMode = useColorMode()
const { showKUNGalgamePageAlpha } = storeToRefs(useKUNGalgameSettingsStore())

const pageWidth = ref(0)
const isDisabled = ref(false)

watch(showKUNGalgamePageAlpha, (value) => {
  pageWidth.value = value
})

watch(pageWidth, () => {
  setTimeout(() => {
    switch ($colorMode.preference) {
      case 'light':
        document.documentElement.style.setProperty(
          '--kungalgame-trans-white-5',
          `rgba(255, 255, 255, ${pageWidth.value / 100})`
        )
        break
      case 'dark':
        document.documentElement.style.setProperty(
          '--kungalgame-trans-white-5',
          `rgba(15, 37, 61, ${pageWidth.value / 100})`
        )
        break
    }
  }, 50)
})
</script>

<template>
  <div
    class="width"
    :class="isDisabled ? 'disabled' : ''"
    :title="isDisabled ? `${$t('header.settings.disabled')}` : ''"
  >
    <div class="width-container">
      <span>{{ $t('header.settings.width') }}</span>
      <span>{{ pageWidth }}%</span>
    </div>

    <div class="page-width">
      <span>50%</span>
      <input
        class="main"
        min="50"
        max="90"
        step="0.1"
        type="range"
        v-model="pageWidth"
        :disabled="isDisabled"
      />
      <span>90%</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-width {
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

.width-container {
  display: flex;
  justify-content: space-between;
}

.disabled {
  cursor: not-allowed;
  color: var(--kungalgame-font-color-0);

  input {
    cursor: not-allowed;
  }
}
</style>
