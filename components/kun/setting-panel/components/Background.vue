<script setup lang="ts">
import { ref, computed } from 'vue'
import { backgroundImages } from './backgroundImage'

const itemsPerPage = 12
const totalPages = Math.ceil(backgroundImages.length / itemsPerPage)
const currentPage = ref(1)

const paginatedImages = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return backgroundImages.slice(start, end)
})

const nextPage = () => {
  if (currentPage.value < totalPages) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const restoreBackground = async () => {
  await usePersistSettingsStore().setSystemBackground(0)
}

const handleChangeImage = async (index: number) => {
  await usePersistSettingsStore().setSystemBackground(index)
}
</script>

<template>
  <div class="space-y-2">
    <div>背景设置</div>

    <div class="shrink-0 space-y-2">
      <div class="flex items-center justify-between">
        <KunButton
          color="primary"
          variant="flat"
          :is-icon-only="true"
          @click="prevPage"
        >
          <KunIcon class="text-inherit" name="lucide:chevron-left" />
        </KunButton>

        <KunButton
          color="primary"
          variant="flat"
          :is-icon-only="true"
          @click="nextPage"
        >
          <KunIcon class="text-inherit" name="lucide:chevron-right" />
        </KunButton>

        <KunButton
          color="primary"
          variant="flat"
          size="sm"
          @click="restoreBackground"
        >
          重置
        </KunButton>

        <KunSettingPanelComponentsCustomBackground />
      </div>

      <div class="grid h-48 grid-cols-3 justify-center gap-2">
        <div
          class="flex shrink-0 items-center justify-center"
          v-for="image in paginatedImages"
          :key="image.index"
        >
          <KunTooltip :text="image.message['zh-cn']" position="bottom">
            <KunImage
              class="w-18 shrink-0 cursor-pointer transition-transform hover:scale-150"
              v-if="image"
              :src="`bg/bg${image.index}-m.webp`"
              @click="handleChangeImage(image.index)"
              loading="lazy"
            />
          </KunTooltip>
        </div>
      </div>
    </div>
  </div>
</template>
