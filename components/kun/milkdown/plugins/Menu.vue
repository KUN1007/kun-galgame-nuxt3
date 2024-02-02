<script setup lang="ts">
import type { UseEditorReturn } from '@milkdown/vue'
import type { CmdKey } from '@milkdown/core'
import { callCommand } from '@milkdown/utils'
import {
  createCodeBlockCommand,
  updateCodeBlockLanguageCommand,
  toggleEmphasisCommand,
  toggleStrongCommand,
  wrapInBlockquoteCommand,
  wrapInBulletListCommand,
  wrapInOrderedListCommand,
  insertHrCommand,
  insertImageCommand,
  toggleInlineCodeCommand,
  toggleLinkCommand,
} from '@milkdown/preset-commonmark'
import {
  insertTableCommand,
  toggleStrikethroughCommand,
} from '@milkdown/preset-gfm'

const props = defineProps<{
  editorInfo: UseEditorReturn
}>()

const { get, loading } = props.editorInfo

const call = <T,>(command: CmdKey<T>, payload?: T) => {
  return get()?.action(callCommand(command, payload))
}

// Select a language TODO:
const selectLanguage = () => {}

// Create code block
const handleClickCodeBlock = () => {
  call(createCodeBlockCommand.key, 'javascript')
}
</script>

<template>
  <div class="menu">
    <!-- Mark Group -->
    <button
      aria-label="kun-galgame-bold"
      @click="call(toggleStrongCommand.key)"
    >
      <Icon name="material-symbols:format-bold-rounded" />
    </button>

    <button
      aria-label="kun-galgame-italic"
      @click="call(toggleEmphasisCommand.key)"
    >
      <Icon name="material-symbols:format-italic-rounded" />
    </button>

    <button
      aria-label="kun-galgame-italic"
      @click="call(toggleStrikethroughCommand.key)"
    >
      <Icon name="material-symbols:strikethrough-s-rounded" />
    </button>

    <button
      aria-label="kun-galgame-table"
      @click="call(insertTableCommand.key)"
    >
      <Icon name="material-symbols:table" />
    </button>

    <button
      aria-label="kun-galgame-list-bulleted"
      @click="call(wrapInBulletListCommand.key)"
    >
      <Icon name="material-symbols:format-list-bulleted-rounded" />
    </button>

    <button
      aria-label="kun-galgame-list-numbered"
      @click="call(wrapInOrderedListCommand.key)"
    >
      <Icon name="material-symbols:format-list-numbered-rounded" />
    </button>

    <button
      aria-label="kun-galgame-quote"
      @click="call(wrapInBlockquoteCommand.key)"
    >
      <Icon name="material-symbols:format-quote-rounded" />
    </button>

    <button
      aria-label="kun-galgame-horizontal"
      @click="call(insertHrCommand.key)"
    >
      <Icon name="material-symbols:horizontal-rule-rounded" />
    </button>

    <button
      aria-label="kun-galgame-italic"
      @click="call(toggleLinkCommand.key)"
    >
      <Icon name="material-symbols:link-rounded" />
    </button>

    <button aria-label="kun-galgame-italic" @click="handleClickCodeBlock">
      <Icon name="material-symbols:code-blocks-outline-rounded" />
    </button>

    <button
      aria-label="kun-galgame-italic"
      @click="call(toggleInlineCodeCommand.key)"
    >
      <Icon name="material-symbols:code-rounded" />
    </button>

    <button
      aria-label="kun-galgame-upload-image"
      @click="call(insertImageCommand.key)"
    >
      <Icon name="line-md:image" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.menu {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  background-color: var(--kungalgame-trans-blue-1);
  border-bottom: 1px solid var(--kungalgame-blue-1);
  border-top: 1px solid var(--kungalgame-blue-1);

  button {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    border: none;
    border-radius: 5px;
    margin: 5px;
    font-size: 22px;
    color: var(--kungalgame-font-color-3);
    background-color: var(--kungalgame-trans-white-9);
    border: 1px solid var(--kungalgame-trans-white-9);
    transition: all 0.2s;

    &:hover {
      border: 1px solid var(--kungalgame-blue-4);
      color: var(--kungalgame-blue-4);
    }
  }
}
</style>
