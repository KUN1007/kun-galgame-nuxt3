import { visit } from 'unist-util-visit'
import type { Element, Text } from 'hast'

export const rehypeKunInsertZeroWidthSpace = () => {
  return (tree: Element) => {
    visit(tree, 'text', (node: Text) => {
      const words = node.value.split(/(\s+)/)
      node.value = words
        .map((word) => {
          if (word.length > 20 && word.includes('_')) {
            return word.replace(/_/g, '_\u200B')
          }
          return word
        })
        .join('')
    })
  }
}
