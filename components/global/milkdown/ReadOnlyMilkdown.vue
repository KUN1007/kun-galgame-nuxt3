<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'

import {
  Editor,
  rootCtx,
  rootAttrsCtx,
  defaultValueCtx,
  editorViewOptionsCtx,
} from '@milkdown/core'
import { Milkdown, useEditor } from '@milkdown/vue'
import { commonmark } from '@milkdown/preset-commonmark'
import { gfm } from '@milkdown/preset-gfm'

import { prism, prismConfig } from '@milkdown/plugin-prism'
import { replaceAll } from '@milkdown/utils'

import '@/styles/editor/index.scss'

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

const props = defineProps<{
  isReadonly: boolean
  valueMarkdown: string
}>()

const valueMarkdown = computed(() => props.valueMarkdown)

const editable = () => !props.isReadonly

const editor = useEditor((root) =>
  Editor.make()
    .config((ctx) => {
      ctx.set(rootCtx, root)
      ctx.set(rootAttrsCtx, {
        roles: 'kun-galgame-milkdown-editor',
        'aria-label': 'kun-galgame-milkdown-editor',
      })
      ctx.set(defaultValueCtx, valueMarkdown.value)

      ctx.update(editorViewOptionsCtx, (prev) => ({
        ...prev,
        editable,
      }))

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
        },
      })
    })
    .use(commonmark)
    .use(gfm)
    .use(prism)
)

watch(
  () => valueMarkdown.value,
  () => {
    editor.get()?.action(replaceAll(valueMarkdown.value))
  }
)
</script>

<!-- MilkdownEditor.vue -->
<template>
  <Milkdown class="editor" />
</template>

<style lang="scss" scoped>
.editor {
  :deep(.milkdown) {
    width: 100%;
    padding: 10px;

    /* Silence css check */
    * {
      white-space: pre-wrap;
    }

    & > div:nth-child(1) {
      transition: all 0.2s;
      margin: 0 auto;
      overflow-y: scroll;

      &::-webkit-scrollbar {
        display: inline;
        width: 7px;
        height: 0;
      }

      &::-webkit-scrollbar-thumb {
        cursor: default;
        background: var(--kungalgame-blue-4);
        border-radius: 3px;
      }

      /* Compatible with Firefox */
      scrollbar-width: thin;
      scrollbar-color: var(--kungalgame-blue-4) var(--kungalgame-blue-1);
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
      padding: 10px;
      font-size: 18px;
      border-left: 4px solid var(--kungalgame-blue-4);
      background-color: var(--kungalgame-trans-blue-0);

      p {
        margin: 0;
      }
    }

    pre {
      margin: 17px 0;
      border: 1px solid var(--kungalgame-blue-4);
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
      color: var(--kungalgame-blue-4);

      &:hover {
        text-decoration: underline;
      }
    }

    table {
      border: 1px solid var(--kungalgame-blue-4);
      border-radius: 5px;
      white-space: nowrap;
    }

    th,
    td {
      border: 1px solid var(--kungalgame-blue-4);
      padding: 3px;
      text-align: left;
    }

    tr:nth-child(even) {
      background-color: var(--kungalgame-trans-blue-1);
    }

    ul li,
    ol li {
      color: var(--kungalgame-blue-5);
    }

    .tableWrapper {
      color: var(--kungalgame-font-color-3);
      position: relative;
      overflow-x: auto;
    }
  }
}
</style>
