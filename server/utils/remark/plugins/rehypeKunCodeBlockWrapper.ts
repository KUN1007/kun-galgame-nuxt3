import type { Plugin } from 'unified'
import type { Root, Element } from 'hast'
import { visit } from 'unist-util-visit'

const getLanguage = (node: Element): string => {
  const className = (node.properties?.className as string[]) || []
  for (const cls of className) {
    if (cls.startsWith('language-')) {
      return cls.substring('language-'.length)
    }
  }
  return 'text'
}

export const rehypeKunCodeBlockWrapper: Plugin<[], Root> = () => {
  return (tree, file) => {
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName !== 'pre' || !parent || typeof index !== 'number') {
        return
      }

      const codeNode = node.children.find(
        (child) => (child as Element).tagName === 'code'
      ) as Element | undefined
      if (!codeNode) return

      const language = getLanguage(codeNode)
      if (!language) return

      const container: Element = {
        type: 'element',
        tagName: 'div',
        properties: {
          className: ['kun-code-container', `language-${language}`]
        },
        children: [
          {
            type: 'element',
            tagName: 'div',
            properties: { className: ['kun-code-header'] },
            children: [
              {
                type: 'element',
                tagName: 'span',
                properties: { className: ['lang'] },
                children: [{ type: 'text', value: language }]
              },
              {
                type: 'element',
                tagName: 'button',
                properties: {
                  className: ['copy'],
                  title: 'Copy code'
                },
                children: []
              }
            ]
          },

          node
        ]
      }

      parent.children[index] = container
    })
  }
}
