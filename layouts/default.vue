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

const { showKUNGalgameSidebarCollapsed } = storeToRefs(
  usePersistSettingsStore()
)
</script>

<template>
  <div class="contents">
    <div class="bg-background fixed top-0 left-0 h-full w-full">
      <div
        class="fixed size-full bg-cover bg-fixed bg-center bg-no-repeat opacity-30 brightness-[var(--kun-background-brightness)]"
        :style="{ backgroundImage: `url(${imageURL})` }"
      />
    </div>

    <div class="hidden md:block">
      <KunLayoutSidebar />
    </div>

    <KunTopBar />

    <div class="bg-primary-50 flex min-h-dvh min-h-screen justify-center">
      <div
        :class="
          cn(
            'z-10 w-full max-w-7xl min-w-0 transition-all duration-300 md:mr-3',
            showKUNGalgameSidebarCollapsed ? 'md:ml-[84px]' : 'md:ml-66'
          )
        "
      >
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
  </div>
</template>
