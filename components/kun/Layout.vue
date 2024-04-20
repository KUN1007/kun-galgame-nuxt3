<script setup lang="ts">
const { showKUNGalgameBackground } = storeToRefs(usePersistSettingsStore())

const imageURL = ref('')

onMounted(async () => {
  imageURL.value = await usePersistSettingsStore().getCurrentBackground()
})

watch(
  () => showKUNGalgameBackground.value,
  async () => {
    imageURL.value = await usePersistSettingsStore().getCurrentBackground()
  }
)
</script>

<template>
  <div class="app" :style="{ backgroundImage: `url(${imageURL})` }">
    <div class="top-bar">
      <KunTopBar />
    </div>
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.app {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
  background-color: var(--kungalgame-white);
  overflow: hidden;
  background-color: var(--kungalgame-blue-0);
}

.top-bar {
  position: sticky;
  top: 0;
  z-index: 1007;
}
</style>
