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
    class="bg-background flex min-h-dvh overflow-hidden bg-cover bg-fixed bg-center bg-no-repeat"
    :style="{ backgroundImage: `url(${imageURL})` }"
  >
    <KunLayoutSidebar />

    <div class="w-full pl-0 md:pl-64">
      <div class="sticky top-[0] z-1007">
        <KunTopBar />
      </div>

      <slot />

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
