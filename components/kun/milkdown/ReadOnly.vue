<script setup lang="ts">
import {
  Editor,
  rootCtx,
  rootAttrsCtx,
  defaultValueCtx,
  editorViewOptionsCtx
} from '@milkdown/core'
import { Milkdown, useEditor } from '@milkdown/vue'
import { commonmark, linkAttr } from '@milkdown/preset-commonmark'
import { gfm } from '@milkdown/preset-gfm'

import { prism, prismConfig } from '@milkdown/plugin-prism'
import { replaceAll } from '@milkdown/utils'

import '~/assets/css/editor/index.scss'

// Syntax highlight
import c from 'refractor/lang/c'
import cpp from 'refractor/lang/cpp'
import csharp from 'refractor/lang/csharp'
import css from 'refractor/lang/css'
import go from 'refractor/lang/go'
import haskell from 'refractor/lang/haskell'
import python from 'refractor/lang/python'
import java from 'refractor/lang/java'
import javascript from 'refractor/lang/javascript'
import typescript from 'refractor/lang/typescript'
import jsx from 'refractor/lang/jsx'
import kotlin from 'refractor/lang/kotlin'
import r from 'refractor/lang/r'
import rust from 'refractor/lang/rust'
import scala from 'refractor/lang/scala'
import sql from 'refractor/lang/sql'
import tsx from 'refractor/lang/tsx'
import markdown from 'refractor/lang/markdown'

// Open link on new tab
import { handleExternal } from './plugins/hyperlinkExternal'

const props = defineProps<{
  isReadonly: boolean
  valueMarkdown: string
}>()

const valueMarkdown = computed(() => props.valueMarkdown)

const editable = () => !props.isReadonly

const { get, loading } = useEditor((root) =>
  Editor.make()
    .config((ctx) => {
      ctx.set(rootCtx, root)
      ctx.set(rootAttrsCtx, {
        roles: 'kun-galgame-milkdown-editor',
        'aria-label': 'kun-galgame-milkdown-editor'
      })
      ctx.set(defaultValueCtx, valueMarkdown.value)

      ctx.update(editorViewOptionsCtx, (prev) => ({
        ...prev,
        editable
      }))

      ctx.set(linkAttr.key, handleExternal)

      ctx.set(prismConfig.key, {
        configureRefractor: (refractor) => {
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
          refractor.register(typescript)
          refractor.register(jsx)
          refractor.register(kotlin)
          refractor.register(r)
          refractor.register(rust)
          refractor.register(scala)
          refractor.register(sql)
          refractor.register(tsx)
        }
      })
    })
    .use(commonmark)
    .use(gfm)
    .use(prism)
)

watch(
  () => valueMarkdown.value,
  () => {
    get()?.action(replaceAll(valueMarkdown.value))
  }
)
</script>

<template>
  <div>
    <pre v-if="loading">{{ valueMarkdown }}</pre>
    <Milkdown ref="milkdownRef" class="editor" />
  </div>
</template>

<style lang="scss" scoped>
pre {
  white-space: pre-wrap;
  word-break: break-all;
}

.editor {
  :deep(.milkdown) {
    width: 100%;
    padding: 10px;

    * {
      white-space: pre-wrap;
      word-break: break-word;
    }

    img {
      max-width: 100%;
    }

    del {
      text-decoration: line-through;
    }

    p {
      margin: 17px 0;
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
      background-color: var(--kungalgame-trans-white-5);
      position: relative;

      code {
        font-size: 15px;
        font-family: monospace;
      }
    }

    a {
      cursor: pointer;
      font-style: oblique;
      font-weight: bold;
      color: var(--kungalgame-blue-5);

      &:hover {
        text-decoration: underline;
      }
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
</style>
