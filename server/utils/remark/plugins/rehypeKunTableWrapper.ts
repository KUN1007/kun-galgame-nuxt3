import type { Plugin } from 'unified'
import type { Root, Element } from 'hast'
import { visit } from 'unist-util-visit'

export const rehypeKunTableWrapper: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName !== 'table' || !parent || typeof index !== 'number') {
        return
      }

      const container: Element = {
        type: 'element',
        tagName: 'div',
        properties: {
          className: ['kun-table-container']
        },
        children: [node]
      }

      parent.children[index] = container
    })
  }
}
