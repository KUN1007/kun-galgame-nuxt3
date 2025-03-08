<script setup lang="ts">
import { editorViewCtx } from '@milkdown/core'
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
  <div class="emoji-container">
    <div class="emoji-grid">
      <span
        v-for="(emoji, index) in paginatedEmojis"
        :key="index"
        @click="selectEmoji(emoji)"
        class="emoji"
      >
        {{ emoji }}
      </span>
    </div>

    <div class="pagination">
      <span class="prev" @click="prevPage">
        <Icon class="icon" name="lucide:chevron-left" />
      </span>

      <span class="next" @click="nextPage">
        <Icon class="icon" name="lucide:chevron-right" />
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.emoji-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 32px;

  padding: 8px;
}

.emoji-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);

  span {
    padding: 2px;
    cursor: pointer;
    text-align: center;
    border-radius: 4px;

    &:hover {
      background-color: var(--kungalgame-trans-blue-2);
    }
  }
}

.pagination {
  display: flex;
  align-items: center;
  margin: 10px 0;

  & > span {
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 10px;
    box-shadow: var(--shadow);
    color: var(--kungalgame-font-color-3);
    transition: all 0.2s;

    &:first-child {
      margin-right: 8px;
    }

    &:hover {
      color: var(--kungalgame-blue-5);
      background-color: var(--kungalgame-trans-blue-0);
    }
  }
}
</style>
