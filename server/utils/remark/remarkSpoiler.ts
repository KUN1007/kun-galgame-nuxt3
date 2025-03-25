// FIXME:
import { visit } from 'unist-util-visit'
import type { Node, Parent } from 'unist'
import type { Plugin } from 'unified'

interface TextNode extends Node {
  type: 'text'
  value: string
}

interface ImageNode extends Node {
  type: 'image'
  url: string
  alt?: string
  title?: string
}

const createSpoilerElement = (
  content: Node[],
  type: 'text' | 'image' = 'text'
) => ({
  type: 'element',
  tagName: 'div',
  properties: {
    className: ['nuxt-spoiler'],
    'data-spoiler-type': type
  },
  children: content
})

export const remarkSpoiler: Plugin = () => {
  return (tree) => {
    visit(tree, 'text', (node: TextNode, index, parent: Parent) => {
      if (!parent || index === null) return

      const matches = node.value.match(/\|\|(.*?)\|\|/g)
      if (!matches) return

      const segments = node.value.split(/(\|\|.*?\|\|)/)
      const children = segments.flatMap((segment) => {
        const spoilerMatch = segment.match(/^\|\|(.*)\|\|$/)
        if (spoilerMatch) {
          return [
            createSpoilerElement([{ type: 'text', value: spoilerMatch[1] }])
          ]
        }
        return [{ type: 'text', value: segment }]
      })

      parent.children.splice(index, 1, ...children)
    })

    visit(tree, 'image', (node: ImageNode, index, parent: Parent) => {
      if (!parent || index === null) return

      const previousNode = parent.children[index - 1]
      const nextNode = parent.children[index + 1]

      if (
        previousNode?.type === 'text' &&
        nextNode?.type === 'text' &&
        previousNode.value.endsWith('||') &&
        nextNode.value.startsWith('||')
      ) {
        previousNode.value = previousNode.value.slice(0, -2)
        nextNode.value = nextNode.value.slice(2)

        const imageElement = {
          type: 'element',
          tagName: 'img',
          properties: {
            src: node.url,
            alt: node.alt || '',
            title: node.title,
            className: [
              'max-w-full',
              'h-auto',
              'rounded',
              'transition-transform',
              'duration-200',
              'group-hover:scale-[0.99]'
            ]
          }
        }

        const spoilerElement = createSpoilerElement([imageElement], 'image')
        parent.children.splice(index, 1, spoilerElement)
      }
    })
  }
}
