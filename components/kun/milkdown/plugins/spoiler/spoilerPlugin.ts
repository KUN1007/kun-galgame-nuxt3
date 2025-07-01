// FIXME:
import type { MilkdownPlugin } from '@milkdown/ctx'
import type { Node } from '@milkdown/transformer'
import { expectDomTypeError } from '@milkdown/exception'
import { InputRule } from '@milkdown/prose/inputrules'
import { $inputRule, $nodeAttr, $nodeSchema, $remark } from '@milkdown/utils'

interface SpoilerNode extends Node {
  type: 'spoiler' | 'text'
  value?: string
  children?: SpoilerNode[]
}

export const spoilerAttr = $nodeAttr('spoiler', () => ({
  container: {
    class: 'spoiler-content',
    style: 'background: #000; color: #222; padding: 0 4px; cursor: pointer;'
  }
}))

export const spoilerSchema = $nodeSchema('spoiler', (ctx) => ({
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
    runner: (state, node, type) => {
      state.openNode(type)
      state.next(node.children || [])
      state.closeNode()
    }
  },
  toMarkdown: {
    match: (node) => node.type.name === 'spoiler',
    runner: (state, node) => {
      state.addNode('text', undefined, '||')
      state.next(node.content)
      state.addNode('text', undefined, '||')
    }
  }
}))

export const insertSpoilerInputRule = $inputRule(
  () =>
    new InputRule(/(?:^|\s)\|\|([^|]+)\|\|$/, (state, match, start, end) => {
      const [fullMatch, content] = match
      if (!content) return null

      const startPos = start + (fullMatch.startsWith(' ') ? 1 : 0)
      const { tr } = state
      const nodeType = state.schema.nodes.spoiler

      return tr
        .replaceWith(
          startPos,
          end,
          nodeType.create({ revealed: false }, state.schema.text(content))
        )
        .scrollIntoView()
    })
)

export const remarkSpoilerPlugin = $remark(
  'remarkSpoiler',
  () => () => (tree) => {
    const transform = (node: SpoilerNode) => {
      if (node.type === 'text' && typeof node.value === 'string') {
        const parts = node.value.split(/(\|\|[^|]+\|\|)/)
        if (parts.length > 1) {
          const newNodes: SpoilerNode[] = []
          parts.forEach((part) => {
            if (part.startsWith('||') && part.endsWith('||')) {
              const content = part.slice(2, -2)
              if (content.trim()) {
                newNodes.push({
                  type: 'spoiler',
                  children: [
                    {
                      type: 'text',
                      value: content
                    }
                  ]
                })
              }
            } else if (part.trim()) {
              newNodes.push({
                type: 'text',
                value: part
              })
            }
          })

          if (newNodes.length > 0) {
            Object.assign(node, newNodes[0])
          }
        }
      }

      if ('children' in node && Array.isArray(node.children)) {
        node.children.forEach((child) => transform(child as SpoilerNode))
      }
    }

    transform(tree as unknown as SpoilerNode)
    return tree
  }
)

export const spoiler: MilkdownPlugin[] = [
  spoilerAttr,
  spoilerSchema,
  insertSpoilerInputRule,
  remarkSpoilerPlugin
].flat()
