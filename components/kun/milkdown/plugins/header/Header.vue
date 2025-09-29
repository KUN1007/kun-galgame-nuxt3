<script setup lang="ts">
import { headingSchema, paragraphSchema } from '@milkdown/kit/preset/commonmark'
import { editorViewCtx } from '@milkdown/kit/core'
import type { UseEditorReturn } from '@milkdown/vue'
import type { Attrs, NodeType } from '@milkdown/kit/prose/model'
import type { Command } from '@milkdown/kit/prose/state'

const props = defineProps<{
  editorInfo: UseEditorReturn
}>()

type HeadingType = 'paragraph' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
interface HeaderItemType {
  value: HeadingType
  label: string
  className: string
}

const headerItem: HeaderItemType[] = [
  { value: 'paragraph', label: '文本段落', className: 'text-base' },
  { value: 'h2', label: '二级标题', className: 'text-2xl font-bold' },
  { value: 'h3', label: '三级标题', className: 'text-xl font-bold' },
  { value: 'h4', label: '四级标题', className: 'text-lg font-bold' },
  { value: 'h5', label: '五级标题', className: 'text-base font-bold' },
  { value: 'h6', label: '六级标题', className: 'text-sm font-bold' }
]

const setBlockType = (
  nodeType: NodeType,
  attrs: Attrs | null = null
): Command => {
  return (state, dispatch) => {
    const { from, to } = state.selection
    const tr = state.tr

    const positions: number[] = []
    state.doc.nodesBetween(from, to, (node, pos) => {
      if (node.isTextblock) {
        positions.push(pos)
      }
      return true
    })

    if (dispatch) {
      positions.forEach((pos) => {
        tr.setBlockType(
          pos,
          pos + state.doc.nodeAt(pos)!.nodeSize || 0,
          nodeType,
          attrs
        )
      })
      dispatch(tr.scrollIntoView())
    }

    return true
  }
}

const handleToggleParagraph = (type: HeadingType) => {
  props.editorInfo.get()?.action((ctx) => {
    const view = ctx.get(editorViewCtx)
    const { dispatch, state } = view

    let command: Command

    if (type === 'paragraph') {
      command = setBlockType(paragraphSchema.type(ctx))
    } else {
      command = setBlockType(headingSchema.type(ctx), {
        level: Number(type.slice(-1))
      })
    }

    command(state, dispatch)
  })
}
</script>

<template>
  <KunPopover position="bottom-start">
    <template #trigger>
      <KunButton variant="light">文本大小</KunButton>
    </template>

    <div class="flex flex-col gap-1 p-3">
      <KunButton
        v-for="(header, index) in headerItem"
        :key="index"
        variant="light"
        @click="handleToggleParagraph(header.value)"
        :class-name="cn('whitespace-nowrap text-foreground', header.className)"
      >
        {{ header.label }}
      </KunButton>
    </div>
  </KunPopover>
</template>
