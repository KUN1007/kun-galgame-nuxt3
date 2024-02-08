<script setup lang="ts">
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
import { toggleStrikethroughCommand } from '@milkdown/preset-gfm'
import type { UseEditorReturn } from '@milkdown/vue'
import type { CmdKey } from '@milkdown/core'

const props = defineProps<{
  editorInfo: UseEditorReturn
}>()

const { get, loading } = props.editorInfo
const input = ref<HTMLElement>()

const call = <T,>(command: CmdKey<T>, payload?: T) => {
  return get()?.action(callCommand(command, payload))
}

// Select a language TODO:
const selectLanguage = () => {}

// Create code block
const handleClickCodeBlock = () => {
  call(createCodeBlockCommand.key, 'javascript')
}

const handleFileChange = async (event: Event) => {
  const input = event.target as HTMLInputElement
  if (!input.files || !input.files[0]) {
    return
  }
  const file = input.files[0]

  const formData = new FormData()
  formData.append('image', file)

  useMessage('Uploading in progress...', '正在上传中...', 'info')
  const { data } = await useFetch('/api/image/topic', {
    method: 'POST',
    body: formData,
    watch: false,
    ...kungalgameResponseHandler,
  })

  if (data.value) {
    const fileName = file.name.replace(/[^a-zA-Z0-9 ]/g, '')
    const userName = useKUNGalgameUserStore().name
    const imageName = `${userName}-${Date.now()}-${fileName}`
    call(insertImageCommand.key, {
      src: data.value ?? '',
      title: imageName,
      alt: imageName,
    })
    useMessage('Image upload successfully!', '图片上传成功!', 'success')
  }
}

const handleClickUploadImage = () => {
  input.value?.click()
}
</script>

<template>
  <div class="menu">
    <!-- Mark Group -->
    <div aria-label="kun-galgame-bold" @click="call(toggleStrongCommand.key)">
      <Icon name="material-symbols:format-bold-rounded" />
    </div>

    <div
      aria-label="kun-galgame-italic"
      @click="call(toggleEmphasisCommand.key)"
    >
      <Icon name="material-symbols:format-italic-rounded" />
    </div>

    <div
      aria-label="kun-galgame-italic"
      @click="call(toggleStrikethroughCommand.key)"
    >
      <Icon name="material-symbols:strikethrough-s-rounded" />
    </div>

    <!-- <div aria-label="kun-galgame-table" @click="call(insertTableCommand.key)">
      <Icon name="material-symbols:table" />
    </div> -->

    <div
      aria-label="kun-galgame-list-bulleted"
      @click="call(wrapInBulletListCommand.key)"
    >
      <Icon name="material-symbols:format-list-bulleted-rounded" />
    </div>

    <div
      aria-label="kun-galgame-list-numbered"
      @click="call(wrapInOrderedListCommand.key)"
    >
      <Icon name="material-symbols:format-list-numbered-rounded" />
    </div>

    <div
      aria-label="kun-galgame-quote"
      @click="call(wrapInBlockquoteCommand.key)"
    >
      <Icon name="material-symbols:format-quote-rounded" />
    </div>

    <div aria-label="kun-galgame-horizontal" @click="call(insertHrCommand.key)">
      <Icon name="material-symbols:horizontal-rule-rounded" />
    </div>

    <div aria-label="kun-galgame-italic" @click="call(toggleLinkCommand.key)">
      <Icon name="material-symbols:link-rounded" />
    </div>

    <div aria-label="kun-galgame-italic" @click="handleClickCodeBlock">
      <Icon name="material-symbols:code-blocks-outline-rounded" />
    </div>

    <div
      aria-label="kun-galgame-italic"
      @click="call(toggleInlineCodeCommand.key)"
    >
      <Icon name="material-symbols:code-rounded" />
    </div>

    <div aria-label="kun-galgame-upload-image" @click="handleClickUploadImage">
      <Icon name="line-md:image" />
      <input
        ref="input"
        hidden
        type="file"
        accept=".jpg, .jpeg, .png, .webp"
        @change="handleFileChange($event)"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.menu {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  background-color: var(--kungalgame-trans-blue-0);
  border-bottom: 1px solid var(--kungalgame-blue-5);
  border-top: 1px solid var(--kungalgame-blue-5);

  div {
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

    &:hover {
      border: 1px solid var(--kungalgame-blue-5);
      color: var(--kungalgame-blue-5);
    }
  }
}
</style>
