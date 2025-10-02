<script setup lang="ts">
// Milkdown core
import { Editor, rootCtx, defaultValueCtx } from '@milkdown/kit/core'
import { Milkdown, useEditor } from '@milkdown/vue'
import { commonmark } from '@milkdown/kit/preset/commonmark'
import { gfm } from '@milkdown/kit/preset/gfm'
// Milkdown Plugins
import { history } from '@milkdown/kit/plugin/history'
import { listener, listenerCtx } from '@milkdown/kit/plugin/listener'
import { clipboard } from '@milkdown/kit/plugin/clipboard'
import { indent } from '@milkdown/kit/plugin/indent'
import { trailing } from '@milkdown/kit/plugin/trailing'
import { usePluginViewFactory } from '@prosemirror-adapter/vue'
import { upload, uploadConfig } from '@milkdown/kit/plugin/upload'

// Custom plugins
import { activeTab } from './atom'
import { kunUploader, kunUploadWidgetFactory } from './plugins/upload/uploader'
import { tooltipFactory } from '@milkdown/kit/plugin/tooltip'
import Tooltip from './plugins/tooltip/Tooltip.vue'
import { replaceAll } from '@milkdown/kit/utils'
import {
  stopLinkCommand,
  linkCustomKeymap
} from './plugins/stop-link/stopLinkPlugin'
import { kunSpoilerPlugin } from './plugins/spoiler/spoilerPlugin'

// Code Block
import { defaultKeymap, indentWithTab } from '@codemirror/commands'
import { keymap, EditorView } from '@codemirror/view'
import {
  codeBlockComponent,
  codeBlockConfig,
  type CodeBlockConfig
} from '@milkdown/kit/component/code-block'
import { basicSetup } from 'codemirror'
import {
  chevronDownIcon,
  clearIcon,
  copyIcon,
  editIcon,
  searchIcon,
  visibilityOffIcon
} from './plugins/code/icons'
import { languages } from '@codemirror/language-data'
import { kunCM } from './codemirror/theme'

// katex
import { blockKatexSchema } from './plugins/katex/blockKatex'
import { mathInlineSchema } from './plugins/katex/inlineKatex'
import { toggleLatexCommand } from './plugins/katex/command'
import {
  mathBlockInputRule,
  mathInlineInputRule
} from './plugins/katex/inputRule'
import { remarkMathBlockPlugin, remarkMathPlugin } from './plugins/katex/remark'
import katex from 'katex'
import type { KatexOptions } from 'katex'

const props = defineProps<{
  valueMarkdown: string
  language: Language
}>()

const emits = defineEmits<{
  saveMarkdown: [markdown: string]
}>()

const valueMarkdown = computed(() => props.valueMarkdown)

const tooltip = tooltipFactory('Text')
const pluginViewFactory = usePluginViewFactory()
const container = ref<HTMLElement | null>(null)
const toolbar = ref<HTMLElement | null>(null)
const editorContent = ref('')

const renderLatex = (content: string, options?: KatexOptions) => {
  const html = katex.renderToString(content, {
    ...options,
    throwOnError: false,
    displayMode: true
  })
  return html
}

const editorInfo = useEditor((root) =>
  Editor.make()
    .config((ctx) => {
      ctx.set(rootCtx, root)
      ctx.set(defaultValueCtx, valueMarkdown.value)

      const listener = ctx.get(listenerCtx)
      listener.markdownUpdated((ctx, markdown, prevMarkdown) => {
        if (markdown !== prevMarkdown) {
          editorContent.value = markdown
          emits('saveMarkdown', markdown)
        }
      })

      ctx.update(uploadConfig.key, (prev) => ({
        ...prev,
        uploader: kunUploader,
        uploadWidgetFactory: kunUploadWidgetFactory
      }))

      ctx.set(tooltip.key, {
        view: pluginViewFactory({
          component: Tooltip
        })
      })

      const extensions = [
        kunCM(),
        EditorView.lineWrapping,
        keymap.of(defaultKeymap.concat(indentWithTab)),
        basicSetup
      ]
      // if (theme) {
      //   extensions.push(theme)
      // }

      ctx.update(codeBlockConfig.key, (defaultConfig) => ({
        extensions,
        languages,
        expandIcon: chevronDownIcon,
        searchIcon: searchIcon,
        clearSearchIcon: clearIcon,
        searchPlaceholder: '搜索咒文',
        copyText: '复制咒文',
        copyIcon: copyIcon,
        onCopy: () => {},
        noResultText: '无结果',
        renderLanguage: defaultConfig.renderLanguage,
        renderPreview: defaultConfig.renderPreview,
        previewToggleButton: (previewOnlyMode) => {
          const icon = previewOnlyMode ? editIcon : visibilityOffIcon
          const text = previewOnlyMode ? '编辑' : '隐藏'
          return [icon, text].map((v) => v.trim()).join(' ')
        },
        previewLabel: defaultConfig.previewLabel
        // previewLoading: config.previewLoading || defaultConfig.previewLoading,
        // previewOnlyByDefault:
        //   config.previewOnlyByDefault ?? defaultConfig.previewOnlyByDefault
      }))

      const katexOptions: KatexOptions = {}

      ctx.update(codeBlockConfig.key, (prev) => ({
        ...prev,
        // @ts-expect-error milkdown type
        renderPreview: (language, content, applyPreview) => {
          if (language.toLowerCase() === 'latex' && content.length > 0) {
            return renderLatex(content, katexOptions)
          }
          const renderPreview = prev.renderPreview
          // @ts-expect-error milkdown type
          return renderPreview(language, content, applyPreview)
        }
      }))
    })
    .use(history)
    .use(commonmark)
    .use(gfm)
    .use(listener)
    .use(clipboard)
    .use(indent)
    .use(trailing)
    .use(tooltip)
    .use(upload)
    .use(codeBlockComponent)
    .use([kunSpoilerPlugin, stopLinkCommand, linkCustomKeymap].flat())
    .use(remarkMathPlugin)
    .use(remarkMathBlockPlugin)
    .use(mathInlineSchema)
    .use(mathInlineInputRule)
    .use(mathBlockInputRule)
    .use(blockKatexSchema)
    .use(toggleLatexCommand)
)

const textCount = computed(() => markdownToText(props.valueMarkdown).length)

watch(
  () => [props.language],
  () => {
    editorInfo.get()?.action(replaceAll(valueMarkdown.value))
  }
)
</script>

<template>
  <div ref="container" class="space-y-3">
    <KunMilkdownPluginsMenu
      ref="toolbar"
      :editor-info="editorInfo"
      :is-show-upload-image="true"
    />

    <template v-if="activeTab === 'preview'">
      <Milkdown />

      <div class="flex items-center justify-between text-sm">
        <slot name="footer" />

        <div class="flex shrink-0 items-center gap-2">
          <KunBadge color="success">
            <KunIconMarkdown class="text-success-700 dark:text-success" />
            Markdown 支持
          </KunBadge>
          <span>
            {{ `${textCount} 字` }}
          </span>
        </div>
      </div>

      <div class="text-default-500 text-sm">
        特殊语法: 您可以使用 ||隐藏文本|| 来隐藏图片或者文字 (目前依然禁止 R18
        图片内容)
      </div>
    </template>
  </div>
</template>
