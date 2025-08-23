import { visit } from 'unist-util-visit'
import type { Plugin } from 'unified'
import type { Root } from 'hast'

export const rehypeKunLazyImage: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'img') {
        node.properties = node.properties || {}
        node.properties.loading = 'lazy'
        node.properties.decoding = 'async'
        node.properties['data-kun-lazy-image'] = 'true'
      }
    })
  }
}
