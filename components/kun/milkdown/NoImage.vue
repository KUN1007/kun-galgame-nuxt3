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
// KUN Visual Novel Custom tooltip
import { tooltipFactory } from '@milkdown/plugin-tooltip'
import Tooltip from './plugins/Tooltip.vue'
import LinkUpdatePopup from './plugins/LinkUpdatePopup.vue'
// Custom text size calculate
import Size from './plugins/Size.vue'
import { $prose, replaceAll } from '@milkdown/utils'
import { Plugin } from '@milkdown/prose/state'

// KUN Visual Novel style
import '~/assets/css/editor/index.scss'

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

const tooltip = tooltipFactory('Text')
const linkUpdatePopup = tooltipFactory('linkUpdate')
const pluginViewFactory = usePluginViewFactory()
const container = ref<HTMLElement | null>(null)
const toolbar = ref<HTMLElement | null>(null)
const editorContent = ref('')

const editorInfo = useEditor((root) =>
  Editor.make()
    .config((ctx) => {
      ctx.set(rootCtx, root)
      ctx.set(rootAttrsCtx, {
        roles: 'kun-galgame-milkdown-editor',
        'aria-label': 'kun-galgame-milkdown-editor'
      })
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

      useTempEditStore().editorContext = ctx

      ctx.set(tooltip.key, {
        view: pluginViewFactory({
          component: Tooltip
        })
      })

      ctx.set(linkUpdatePopup.key, {
        view: pluginViewFactory({
          component: LinkUpdatePopup
        })
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
    .use(tooltip)
    .use(linkUpdatePopup)
    .use(insertLinkPlugin)
    .use(automd)
    // Add custom plugin view, calculate markdown text size
    .use(
      $prose(
        () =>
          new Plugin({
            view: pluginViewFactory({
              component: Size,
              root: () => (container.value ? container.value : root)
            })
          })
      )
    )
)

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

    <Milkdown class="editor" />

    <div class="loading" v-if="editorInfo.loading.value">
      <span><Icon name="svg-spinners:12-dots-scale-rotate" /></span>
      <span>{{ $t('edit.topic.loading') }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.editor {
  position: relative;

  :deep(.milkdown) {
    width: 100%;
    padding: 10px;

    /* Silence css check */
    * {
      white-space: pre-wrap;
      word-break: break-word;
    }

    & > div:nth-child(1) {
      transition: all 0.2s;
      margin: 0 auto;
      min-height: 300px;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin: 17px 0;
    }

    img {
      max-width: 100%;
    }

    del {
      text-decoration: line-through;
    }

    p {
      margin: 17px 0;

      code {
        background-color: var(--kungalgame-trans-blue-1);
        padding: 2px 7px;
        font-size: 13px;
        border-radius: 7px;
      }
    }

    blockquote {
      margin: 17px 0;
      padding: 17px;
      border-left: 5px solid var(--kungalgame-blue-5);
      border-radius: 10px;
      background-color: var(--kungalgame-trans-blue-0);
      color: var(--kungalgame-font-color-3);
      font-style: oblique;
      line-height: 2rem;

      p {
        margin: 0;
      }
    }

    pre {
      margin: 17px 0;
      border: 1px solid var(--kungalgame-blue-5);
      border-radius: 5px;
      padding: 17px;
      background-color: var(--kungalgame-trans-white-2);
      position: relative;

      code {
        font-size: 15px;
        font-family: monospace;
      }
    }

    a {
      cursor: pointer;
      font-weight: bold;
      color: var(--kungalgame-blue-5);
      text-decoration: underline;
      text-underline-offset: 3px;
    }

    table {
      border: 1px solid var(--kungalgame-blue-5);
      border-radius: 5px;
      white-space: nowrap;
    }

    th,
    td {
      border: 1px solid var(--kungalgame-blue-5);
      padding: 3px;
      text-align: left;
    }

    tr:nth-child(even) {
      background-color: var(--kungalgame-trans-blue-1);
    }

    .tableWrapper {
      color: var(--kungalgame-font-color-3);
      position: relative;
      overflow-x: auto;
    }
  }
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 374px;

  span {
    margin-left: 20px;
    font-size: large;
    font-style: oblique;
    color: var(--kungalgame-blue-5);

    &:nth-child(1) {
      font-size: 50px;
    }
  }
}
</style>
