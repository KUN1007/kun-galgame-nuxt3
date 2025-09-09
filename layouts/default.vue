<script setup lang="ts">
const { showKUNGalgameBackground, showKUNGalgameBackLoli } = storeToRefs(
  usePersistSettingsStore()
)

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
  <div
    class="fixed size-full bg-cover bg-fixed bg-center bg-no-repeat brightness-[var(--kun-background-brightness)]"
    :style="{ backgroundImage: `url(${imageURL})` }"
  />

  <div class="hidden md:block">
    <KunLayoutSidebar />
  </div>

  <KunTopBar />

  <div class="bg-primary-50 flex min-h-dvh min-h-screen justify-center">
    <div class="z-10 w-full max-w-7xl min-w-0 md:mr-3 md:ml-66">
      <div class="h-full px-1 pt-19 pb-3 md:px-0">
        <NuxtPage />
      </div>

      <NuxtImg
        v-if="showKUNGalgameBackLoli"
        class="pointer-events-none fixed right-px bottom-px z-0 opacity-17 select-none"
        src="/image/kohaku.webp"
        loading="lazy"
        alt="kohaku"
      />
    </div>
  </div>
</template>
