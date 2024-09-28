<script setup lang="ts">
import { callCommand } from '@milkdown/utils'
import {
  createCodeBlockCommand,
  toggleEmphasisCommand,
  toggleStrongCommand,
  wrapInBlockquoteCommand,
  wrapInBulletListCommand,
  wrapInOrderedListCommand,
  insertHrCommand,
  insertImageCommand,
  toggleInlineCodeCommand
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

const call = <T,>(command: CmdKey<T>, payload?: T, callback?: () => void) => {
  const result = get()?.action(callCommand(command, payload))
  if (callback) {
    callback()
  }
  return result
}

const handleFileChange = async (event: Event) => {
  const input = event.target as HTMLInputElement
  if (!input.files || !input.files[0]) {
    return
  }
  const file = input.files[0]

  const formData = new FormData()
  formData.append('image', file)

  useMessage(10107, 'info')
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
    useMessage(10108, 'success')
  }
}
</script>

<template>
  <div class="menu">
    <KunMilkdownPluginsModeToggle />

    <!-- Mark Group -->
    <div
      class="btn"
      aria-label="kun-galgame-bold"
      @click="call(toggleStrongCommand.key)"
      v-tooltip="{
        message: {
          'en-us': 'Bold',
          'ja-jp': '太字',
          'zh-cn': '加粗',
          'zh-tw': '加粗'
        },
        position: 'bottom'
      }"
    >
      <Icon class="icon" name="lucide:bold" />
    </div>

    <div
      class="btn"
      aria-label="kun-galgame-italic"
      @click="call(toggleEmphasisCommand.key)"
      v-tooltip="{
        message: {
          'en-us': 'Italic',
          'ja-jp': '斜体',
          'zh-cn': '斜体',
          'zh-tw': '斜體'
        },
        position: 'bottom'
      }"
    >
      <Icon class="icon" name="lucide:italic" />
    </div>

    <div
      class="btn"
      aria-label="kun-galgame-strikethrough"
      @click="call(toggleStrikethroughCommand.key)"
      v-tooltip="{
        message: {
          'en-us': 'Strikethrough',
          'ja-jp': '打消し線',
          'zh-cn': '删除线',
          'zh-tw': '刪除線'
        },
        position: 'bottom'
      }"
    >
      <Icon class="icon" name="lucide:strikethrough" />
    </div>

    <div
      class="btn"
      aria-label="kun-galgame-list-bulleted"
      @click="call(wrapInBulletListCommand.key)"
      v-tooltip="{
        message: {
          'en-us': 'Bulleted List',
          'ja-jp': '箇条書き',
          'zh-cn': '无序列表',
          'zh-tw': '無序列錶'
        },
        position: 'bottom'
      }"
    >
      <Icon class="icon" name="lucide:list" />
    </div>

    <div
      class="btn"
      aria-label="kun-galgame-list-numbered"
      @click="call(wrapInOrderedListCommand.key)"
      v-tooltip="{
        message: {
          'en-us': 'Ordered List',
          'ja-jp': '番号付きリスト',
          'zh-cn': '有序列表',
          'zh-tw': '有序列錶'
        },
        position: 'bottom'
      }"
    >
      <Icon class="icon" name="lucide:list-ordered" />
    </div>

    <div
      class="btn"
      aria-label="kun-galgame-quote"
      @click="call(wrapInBlockquoteCommand.key)"
      v-tooltip="{
        message: {
          'en-us': 'Quote Block',
          'ja-jp': '引用ブロック',
          'zh-cn': '引用块',
          'zh-tw': '引用塊'
        },
        position: 'bottom'
      }"
    >
      <Icon class="icon" name="lucide:quote" />
    </div>

    <div
      class="btn"
      aria-label="kun-galgame-horizontal"
      @click="call(insertHrCommand.key)"
      v-tooltip="{
        message: {
          'en-us': 'Horizontal Line',
          'ja-jp': '水平線',
          'zh-cn': '水平线',
          'zh-tw': '水平線'
        },
        position: 'bottom'
      }"
    >
      <Icon class="icon" name="lucide:minus" />
    </div>

    <div
      class="btn"
      aria-label="kun-galgame-insert-link"
      @click="isShowInsertLink = true"
      v-tooltip="{
        message: {
          'en-us': 'Insert Link',
          'ja-jp': 'リンク挿入',
          'zh-cn': '插入链接',
          'zh-tw': '插入鏈接'
        },
        position: 'bottom'
      }"
    >
      <Icon class="icon" name="lucide:link" />
      <KunMilkdownPluginsLinkInsertDialog
        :show="isShowInsertLink"
        @insert="
          call(
            insertLinkPlugin.key,
            undefined,
            () => (isShowInsertLink = false)
          )
        "
        @cancel="isShowInsertLink = false"
      />
    </div>

    <div
      class="btn"
      aria-label="kun-galgame-code-block"
      @click="call(createCodeBlockCommand.key, 'javascript')"
      v-tooltip="{
        message: {
          'en-us': 'Code Block',
          'ja-jp': 'コードブロック',
          'zh-cn': '代码块',
          'zh-tw': '代碼塊'
        },
        position: 'bottom'
      }"
    >
      <Icon class="icon" name="lucide:square-code" />
    </div>

    <div
      class="btn"
      aria-label="kun-galgame-code"
      @click="call(toggleInlineCodeCommand.key)"
      v-tooltip="{
        message: {
          'en-us': 'Inline Code',
          'ja-jp': 'インラインコード',
          'zh-cn': '行内代码',
          'zh-tw': '行內代碼'
        },
        position: 'bottom'
      }"
    >
      <Icon class="icon" name="lucide:code-xml" />
    </div>

    <div
      class="btn"
      aria-label="kun-galgame-upload-image"
      v-if="props.isShowUploadImage"
      @click="input?.click()"
      v-tooltip="{
        message: {
          'en-us': 'Upload Image',
          'ja-jp': '画像アップロード',
          'zh-cn': '上传图片',
          'zh-tw': '上傳圖片'
        },
        position: 'bottom'
      }"
    >
      <Icon class="icon" name="lucide:image-plus" />
      <input
        ref="input"
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

  .btn {
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
    background-color: transparent;
    border: 1px solid transparent;

    &:hover {
      border: 1px solid var(--kungalgame-blue-5);
      color: var(--kungalgame-blue-5);
    }
  }
}

input {
  display: none;
}
</style>
