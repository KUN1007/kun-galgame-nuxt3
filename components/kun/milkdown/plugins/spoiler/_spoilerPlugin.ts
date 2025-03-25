import { commandsCtx, remarkStringifyOptionsCtx } from '@milkdown/core'
import type { MilkdownPlugin } from '@milkdown/ctx'
import type { Node } from '@milkdown/transformer'
import { expectDomTypeError } from '@milkdown/exception'
import { InputRule } from '@milkdown/prose/inputrules'
import { markRule } from '@milkdown/prose'
import { $inputRule, $markAttr, $markSchema, $remark } from '@milkdown/utils'
import { visit } from 'unist-util-visit'
import type { Parent, Node as UnistNode } from 'unist'

interface SpoilerNode extends UnistNode {
  type: 'spoiler'
  children: TextNode[]
}

interface TextNode extends UnistNode {
  type: 'text'
  value: string
}

export const spoilerAttr = $markAttr('spoiler', () => ({
  container: {
    class: 'spoiler-content',
    style: 'background: #000; color: #222; padding: 0 4px; cursor: pointer;'
  }
}))

export const spoilerSchema = $markSchema('spoiler', (ctx) => ({
  group: 'inline',
  inline: true,
  content: 'inline*',
  marks: '',
  attrs: {
    revealed: { default: false },
    marker: { default: '||' }
  },
  parseDOM: [
    {
      tag: 'span[data-type="spoiler"]',
      getAttrs: (dom) => {
        if (!(dom instanceof HTMLElement)) throw expectDomTypeError(dom)
        return {
          revealed: dom.getAttribute('data-revealed') === 'true'
        }
      }
    }
  ],
  toDOM: (node) => {
    const attrs = ctx.get(spoilerAttr.key)(node)
    return [
      'span',
      {
        ...attrs.container,
        'data-type': 'spoiler',
        'data-revealed': node.attrs.revealed,
        onclick:
          'this.style.color = this.style.color === "#000" ? "#fff" : "#000";'
      },
      0
    ]
  },
  parseMarkdown: {
    match: ({ type }) => type === 'spoiler',
    runner: (state, mark, type) => {
      state.openMark(type)
      state.next(mark.children || [])
      state.closeMark(type)
    }
  },
  toMarkdown: {
    match: (mark) => mark.type.name === 'spoiler',
    runner: (state, mark) => {
      state.withMark(mark, 'text', undefined, {
        marker: mark.attrs.marker
      })
    }
  }
}))

export const insertSpoilerInputRule = $inputRule((ctx) =>
  markRule(/(?:^|\s)\|\|([^|]+)\|\|$/, spoilerSchema.type(ctx), {
    getAttr: (match) => {
      return {
        marker: match[0].startsWith('||')
      }
    },
    updateCaptured: ({ fullMatch, start }) =>
      !fullMatch.startsWith('||')
        ? { fullMatch: fullMatch.slice(1), start: start + 1 }
        : {}
  })
)

const createSpoilerNode = (content: string): SpoilerNode => {
  return {
    type: 'spoiler',
    children: [
      {
        type: 'text',
        value: content
      }
    ]
  }
}

export const remarkSpoilerPlugin = $remark('remarkSpoiler', () => {
  const transformer = (tree: UnistNode) => {
    visit(tree, 'text', (node: TextNode, index: number, parent: Parent) => {
      if (!parent || index === null) return

      const value = node.value
      const regex = /\|\|([^|]+)\|\|/g
      let match
      let lastIndex = 0
      const newNodes = []

      while ((match = regex.exec(value)) !== null) {
        if (match.index > lastIndex) {
          newNodes.push({
            type: 'spoiler',
            value: value.slice(lastIndex, match.index)
          })
        }
        newNodes.push(createSpoilerNode(match[1]))
        lastIndex = regex.lastIndex
      }

      if (lastIndex < value.length) {
        newNodes.push({
          type: 'text',
          value: value.slice(lastIndex)
        })
      }

      if (newNodes.length > 0) {
        parent.children.splice(index, 1, ...newNodes)
      }
    })
  }

  return transformer
})

export const spoiler: MilkdownPlugin[] = [
  spoilerAttr,
  spoilerSchema,
  insertSpoilerInputRule,
  remarkSpoilerPlugin
].flat()

export default defineNuxtPlugin(() => {
  return {
    provide: {
      milkdownSpoiler: spoiler
    }
  }
})
