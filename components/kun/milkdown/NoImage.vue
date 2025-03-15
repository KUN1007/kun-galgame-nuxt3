<script setup lang="ts">
// Milkdown core
import { Editor, rootCtx, rootAttrsCtx, defaultValueCtx } from '@milkdown/core'
import { Milkdown, useEditor } from '@milkdown/vue'
import { commonmark } from '@milkdown/preset-commonmark'
import { gfm } from '@milkdown/preset-gfm'
// Milkdown Plugins
import { history } from '@milkdown/plugin-history'
import { prism, prismConfig } from '@milkdown/plugin-prism'
import { listener, listenerCtx } from '@milkdown/plugin-listener'
import { clipboard } from '@milkdown/plugin-clipboard'
import { indent } from '@milkdown/plugin-indent'
import { trailing } from '@milkdown/plugin-trailing'
import { usePluginViewFactory } from '@prosemirror-adapter/vue'
import { insertLinkPlugin } from './plugins/hyperlinkInsert'
import { automd } from '@milkdown/plugin-automd'

// Syntax highlight
import bash from 'refractor/lang/bash'
import c from 'refractor/lang/c'
import cpp from 'refractor/lang/cpp'
import csharp from 'refractor/lang/csharp'
import css from 'refractor/lang/css'
import go from 'refractor/lang/go'
import haskell from 'refractor/lang/haskell'
import python from 'refractor/lang/python'
import java from 'refractor/lang/java'
import javascript from 'refractor/lang/javascript'
import jsx from 'refractor/lang/jsx'
import json from 'refractor/lang/json'
import kotlin from 'refractor/lang/kotlin'
import r from 'refractor/lang/r'
import rust from 'refractor/lang/rust'
import scala from 'refractor/lang/scala'
import sql from 'refractor/lang/sql'
import tsx from 'refractor/lang/tsx'
import typescript from 'refractor/lang/typescript'
import markdown from 'refractor/lang/markdown'

const props = defineProps<{
  valueMarkdown: string
  language: Language
  pending?: boolean
}>()

const emits = defineEmits<{
  saveMarkdown: [editorMarkdown: string]
}>()

const valueMarkdown = computed(() => props.valueMarkdown)

const container = ref<HTMLElement | null>(null)
const toolbar = ref<HTMLElement | null>(null)
const editorContent = ref('')

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

      ctx.set(prismConfig.key, {
        configureRefractor: (refractor) => {
          refractor.register(bash)
          refractor.register(c)
          refractor.register(cpp)
          refractor.register(csharp)
          refractor.register(css)
          refractor.register(go)
          refractor.register(haskell)
          refractor.register(python)
          refractor.register(markdown)
          refractor.register(java)
          refractor.register(javascript)
          refractor.register(json)
          refractor.register(jsx)
          refractor.register(kotlin)
          refractor.register(r)
          refractor.register(rust)
          refractor.register(scala)
          refractor.register(sql)
          refractor.register(tsx)
          refractor.register(typescript)
        }
      })
    })
    .use(history)
    .use(commonmark)
    .use(gfm)
    .use(prism)
    .use(listener)
    .use(clipboard)
    .use(indent)
    .use(trailing)
    .use(insertLinkPlugin)
    .use(automd)
)

const textCount = computed(() => markdownToText(props.valueMarkdown).length)

watch(
  () => [props.language, props.pending],
  () => {
    editorInfo.get()?.action(replaceAll(valueMarkdown.value))
  }
)
</script>

<template>
  <div ref="container" class="editor-container">
    <KunMilkdownPluginsMenu
      ref="toolbar"
      :editor-info="editorInfo"
      :is-show-upload-image="false"
    />

    <Milkdown />

    <div class="flex items-center justify-between text-sm">
      <slot />
      <span> {{ `${textCount} 字` }} </span>
    </div>
  </div>
</template>
