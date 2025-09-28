<script setup lang="ts">
import { callCommand } from '@milkdown/kit/utils'
import { insertImageCommand } from '@milkdown/kit/preset/commonmark'
import type { UseEditorReturn } from '@milkdown/vue'

const props = defineProps<{
  editorInfo: UseEditorReturn
}>()

// https://sticker.kungal.com/
const generateStickerArray = () => {
  const result = []
  for (let set = 1; set <= 6; set++) {
    for (let id = 1; id <= 80; id++) {
      result.push(`https://sticker.kungal.com/stickers/KUNgal${set}/${id}.webp`)
    }
  }
  return result.slice(0, -6)
}

const stickerArray = generateStickerArray()
const currentPage = ref(1)
const totalPages = computed(() => Math.ceil(stickerArray.length / 25))

const paginatedStickers = computed(() => {
  const start = (currentPage.value - 1) * 25
  return stickerArray.slice(start, start + 25)
})

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const selectSticker = (stickerUrl: string) => {
  props.editorInfo.get()?.action(
    callCommand(insertImageCommand.key, {
      src: stickerUrl,
      title: 'Sticker',
      alt: 'Sticker'
    })
  )
}
</script>

<template>
  <div class="flex flex-col items-center gap-2 rounded-lg p-2">
    <div class="grid h-68 w-64 grid-cols-5 gap-1">
      <template v-for="(sticker, index) in paginatedStickers" :key="index">
        <KunImage
          @click="selectSticker(sticker)"
          :src="sticker"
          class="h-full w-full rounded-lg object-contain"
          :alt="`Sticker ${index + 1}`"
          placeholder="/favicon.webp"
        />
      </template>
    </div>

    <div class="flex justify-center gap-1">
      <KunButton
        :is-icon-only="true"
        variant="light"
        size="lg"
        @click="prevPage"
        :disabled="currentPage === 1"
      >
        <KunIcon name="lucide:chevron-left" />
      </KunButton>
      <KunButton variant="flat" class="mx-2">
        {{ currentPage }} / {{ totalPages }}
      </KunButton>
      <KunButton
        :is-icon-only="true"
        variant="light"
        size="lg"
        @click="nextPage"
        :disabled="currentPage === totalPages"
      >
        <KunIcon name="lucide:chevron-right" />
      </KunButton>
    </div>
  </div>
</template>
