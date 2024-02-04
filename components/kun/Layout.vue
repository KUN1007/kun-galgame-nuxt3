<script setup lang="ts">
const { showKUNGalgameBackground } = storeToRefs(useKUNGalgameSettingsStore())

const imageURL = ref('')
const getCurrentBackground = async () => {
  const backgroundImageBlobData = await getImage('kun-galgame-custom-bg')
  if (showKUNGalgameBackground.value === 0) {
    return 'none'
  }

  if (showKUNGalgameBackground.value === -1 && backgroundImageBlobData) {
    return URL.createObjectURL(backgroundImageBlobData)
  }

  return `/bg/bg${showKUNGalgameBackground.value}.webp`
}

onMounted(async () => {
  imageURL.value = await getCurrentBackground()
})

watch(
  () => showKUNGalgameBackground.value,
  async () => {
    imageURL.value = await getCurrentBackground()
  }
)
</script>

<template>
  <div class="app" :style="{ backgroundImage: `url(${imageURL})` }">
    <div class="top-bar">
      <KunTopBar />
    </div>
    <NuxtPage />
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
}

.top-bar {
  position: sticky;
  top: 0;
  z-index: 1007;
}
</style>
