import type { MilkdownPlugin } from '@milkdown/kit/ctx'
import type { Node } from '@milkdown/kit/transformer'
import { expectDomTypeError } from '@milkdown/exception'
import { InputRule } from '@milkdown/prose/inputrules'
import {
  $inputRule,
  $nodeAttr,
  $nodeSchema,
  $remark,
  $command
} from '@milkdown/kit/utils'
import { visit } from 'unist-util-visit'
import type { Node as UnistNode } from 'unist'

interface SpoilerNode extends Node {
  type: 'kun-spoiler' | 'text'
  value?: string
  children?: SpoilerNode[]
}

export const spoilerAttr = $nodeAttr('kun-spoiler', () => ({
  container: {
    class: 'kun-spoiler',
    style:
      'background: var(--color-default-500); border-radius: 8px; padding: 0 4px; cursor: pointer;'
  }
}))

export const spoilerSchema = $nodeSchema('kun-spoiler', (ctx) => ({
  group: 'inline',
  inline: true,
  content: 'inline*',
  marks: '',
  attrs: {
    revealed: {
      default: false
    }
  },
  parseDOM: [
    {
      tag: 'span[data-type="kun-spoiler"]',
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
        'data-type': 'kun-spoiler',
        'data-revealed': node.attrs.revealed
      },
      0
    ]
  },
  parseMarkdown: {
    match: ({ type }) => type === 'kun-spoiler',
    runner: (state, node, type) => {
      state.openNode(type)
      state.next(node.children || [])
      state.closeNode()
    }
  },
  toMarkdown: {
    match: (node) => node.type.name === 'kun-spoiler',
    runner: (state, node) => {
      state.addNode('text', undefined, '||')
      state.next(node.content)
      state.addNode('text', undefined, '||')
    }
  }
}))

// FIXME:
export const insertKunSpoilerCommand = $command(
  'InsertKunSpoiler',
  (ctx) => () => (state, dispatch) => {
    if (!dispatch) {
      return true
    }
    const node = spoilerSchema.type(ctx).create()
    if (!node) {
      return true
    }
    dispatch(state.tr.replaceSelectionWith(node).scrollIntoView())
    return true
  }
)

export const insertSpoilerInputRule = $inputRule(
  () =>
    new InputRule(/(?:^|\s)\|\|(.*?)\|\|$/, (state, match, start, end) => {
      const [fullMatch, content] = match
      if (!content) return null
      const startPos = start + (fullMatch.startsWith(' ') ? 1 : 0)
      const { tr } = state
      const schema = state.schema
      const spoilerNodeType = schema.nodes['kun-spoiler']
      if (!spoilerNodeType) return null

      const spoilerNode = spoilerNodeType.create(
        { revealed: false },
        schema.text(content)
      )
      const zeroWidthSpace = schema.text('\u200B')
      return tr
        .replaceWith(startPos, end, [spoilerNode, zeroWidthSpace])
        .setStoredMarks([])
        .scrollIntoView()
    })
)

export const remarkSpoilerPlugin = $remark('remarkSpoiler', () => (tree) => {
  const transformer = (tree: UnistNode) => {
    visit(tree, 'text', (node: SpoilerNode, index, parent: SpoilerNode) => {
      if (typeof node.value !== 'string' || !parent) {
        return
      }

      const regex = /\|\|(.*?)\|\|/g
      if (!regex.test(node.value)) {
        return
      }

      regex.lastIndex = 0

      const newNodes: SpoilerNode[] = []
      let lastIndex = 0
      let match

      while ((match = regex.exec(node.value)) !== null) {
        const [fullMatch, content] = match

        if (match.index > lastIndex) {
          newNodes.push({
            type: 'text',
            value: node.value.slice(lastIndex, match.index)
          })
        }

        if (content) {
          newNodes.push({
            type: 'kun-spoiler',
            children: [{ type: 'text', value: content }]
          })
        }

        lastIndex = regex.lastIndex
      }

      if (lastIndex < node.value.length) {
        newNodes.push({ type: 'text', value: node.value.slice(lastIndex) })
      }

      if (newNodes.length > 0 && typeof index === 'number') {
        parent.children?.splice(index, 1, ...newNodes)
      }
    })
  }

  return transformer
})

export const kunSpoilerPlugin: MilkdownPlugin[] = [
  spoilerAttr,
  spoilerSchema,
  insertSpoilerInputRule,
  remarkSpoilerPlugin
].flat()
