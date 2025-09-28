<script setup lang="ts">
import { editorViewCtx } from '@milkdown/kit/core'
import { emojiArray } from './_isoEmoji'
import type { UseEditorReturn } from '@milkdown/vue'

const props = defineProps<{
  editorInfo: UseEditorReturn
}>()

const currentPage = ref(1)
const totalPages = computed(() => Math.ceil(emojiArray.length / 49))

const paginatedEmojis = computed(() => {
  const start = (currentPage.value - 1) * 49
  return emojiArray.slice(start, start + 49)
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

const selectEmoji = (emoji: string) => {
  props.editorInfo.get()?.action((ctx) => {
    const view = ctx.get(editorViewCtx)
    const { state } = view
    const { tr } = state
    view.dispatch(tr.insertText(emoji, state.selection.from))
  })
}
</script>

<template>
  <div class="flex flex-col items-center rounded-lg p-2">
    <div class="grid h-68 w-64 grid-cols-7">
      <KunButton
        :is-icon-only="true"
        variant="light"
        v-for="(emoji, index) in paginatedEmojis"
        :key="index"
        @click="selectEmoji(emoji)"
        size="xl"
        class-name="shrink-0"
      >
        {{ emoji }}
      </KunButton>
    </div>

    <div class="flex justify-center gap-1">
      <KunButton :is-icon-only="true" variant="light" @click="prevPage">
        <KunIcon name="lucide:chevron-left" />
      </KunButton>

      <KunButton :is-icon-only="true" variant="light" @click="nextPage">
        <KunIcon name="lucide:chevron-right" />
      </KunButton>
    </div>
  </div>
</template>
