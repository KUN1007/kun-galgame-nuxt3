<script setup lang="ts">
const { showKUNGalgameBackground, showKUNGalgameCustomBackground } =
  storeToRefs(useKUNGalgameSettingsStore())

const imageURL = ref('')
const { getCurrentBackground } = useBackgroundPicture.asyncData(
  useNuxtApp().$pinia
)

onMounted(async () => {
  const backgroundImageBlobData = await getImage('kun-galgame-custom-bg')
  if (showKUNGalgameBackground.value === 'bg1007' && backgroundImageBlobData) {
    showKUNGalgameCustomBackground.value = URL.createObjectURL(
      backgroundImageBlobData
    )
  }
  imageURL.value = await getCurrentBackground()
})

watch(
  () => [showKUNGalgameBackground.value, showKUNGalgameCustomBackground.value],
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
}

.top-bar {
  position: sticky;
  top: 0;
  z-index: 1007;
}
</style>
