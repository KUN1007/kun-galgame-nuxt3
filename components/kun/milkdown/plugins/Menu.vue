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
  toggleLinkCommand
} from '@milkdown/preset-commonmark'
import { toggleStrikethroughCommand } from '@milkdown/preset-gfm'
import type { UseEditorReturn } from '@milkdown/vue'
import type { CmdKey } from '@milkdown/core'
import { insertLinkPlugin } from './hyperlinkInsert'

const props = defineProps<{
  editorInfo: UseEditorReturn
  isShowUploadImage: boolean
}>()

const { get, loading } = props.editorInfo
const input = ref<HTMLElement>()
const isShowInsertLink = ref(false)

const call = <T,>(command: CmdKey<T>, payload?: T) => {
  return get()?.action(callCommand(command, payload))
}

const handelInsertLink = (href: string, text: string) => {
  call(insertLinkPlugin.key, { href, text })
  isShowInsertLink.value = false
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
  const result = await $fetch('/api/image/topic', {
    method: 'POST',
    body: formData,
    watch: false,
    ...kungalgameResponseHandler
  })

  if (result) {
    const fileName = file.name.replace(/[^a-zA-Z0-9 ]/g, '')
    const userName = usePersistUserStore().name
    const imageName = `${userName}-${Date.now()}-${fileName}`
    call(insertImageCommand.key, {
      src: result ?? '',
      title: imageName,
      alt: imageName
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
      <Icon name="lucide:bold" />
    </div>

    <div
      aria-label="kun-galgame-italic"
      @click="call(toggleEmphasisCommand.key)"
    >
      <Icon name="lucide:italic" />
    </div>

    <div
      aria-label="kun-galgame-italic"
      @click="call(toggleStrikethroughCommand.key)"
    >
      <Icon name="lucide:strikethrough" />
    </div>

    <!-- <div aria-label="kun-galgame-table" @click="call(insertTableCommand.key)">
      <Icon name="lucide:table" />
    </div> -->

    <div
      aria-label="kun-galgame-list-bulleted"
      @click="call(wrapInBulletListCommand.key)"
    >
      <Icon name="lucide:list" />
    </div>

    <div
      aria-label="kun-galgame-list-numbered"
      @click="call(wrapInOrderedListCommand.key)"
    >
      <Icon name="lucide:list-ordered" />
    </div>

    <div
      aria-label="kun-galgame-quote"
      @click="call(wrapInBlockquoteCommand.key)"
    >
      <Icon name="lucide:quote" />
    </div>

    <div aria-label="kun-galgame-horizontal" @click="call(insertHrCommand.key)">
      <Icon name="lucide:minus" />
    </div>

    <div aria-label="kun-galgame-italic" @click="isShowInsertLink = true">
      <Icon name="lucide:link" />
      <KunMilkdownPluginsLinkInsertDialog
        :show="isShowInsertLink"
        @insert="handelInsertLink"
        @cancel="isShowInsertLink = false"
      />
    </div>

    <div aria-label="kun-galgame-italic" @click="handleClickCodeBlock">
      <Icon name="lucide:square-code" />
    </div>

    <div
      aria-label="kun-galgame-italic"
      @click="call(toggleInlineCodeCommand.key)"
    >
      <Icon name="lucide:code-xml" />
    </div>

    <div
      aria-label="kun-galgame-upload-image"
      v-if="props.isShowUploadImage"
      @click="handleClickUploadImage"
    >
      <Icon name="lucide:image-plus" />
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
  position: sticky;
  top: 0;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  background-color: var(--kungalgame-trans-blue-0);
  backdrop-filter: blur(10px);
  z-index: 999;

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
