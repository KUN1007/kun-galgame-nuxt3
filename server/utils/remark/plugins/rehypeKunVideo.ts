import type { Plugin } from 'unified'
import type { Root, Element, Text } from 'hast'
import { visit } from 'unist-util-visit'

export const rehypeKunVideo: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      if (!parent || typeof index !== 'number') {
        return
      }

      if (node.tagName !== 'a') {
        return
      }

      const href = node.properties?.href as string | undefined
      const firstChild = node.children[0] as Text | undefined

      if (
        href &&
        href.endsWith('.mp4') &&
        firstChild &&
        firstChild.type === 'text' &&
        firstChild.value.startsWith('kv:')
      ) {
        const videoNode: Element = {
          type: 'element',
          tagName: 'video',
          properties: {
            src: href,
            controls: true,
            loop: true,
            playsinline: true,
            width: '100%'
          },
          children: []
        }

        parent.children[index] = videoNode
      }
    })
  }
}
