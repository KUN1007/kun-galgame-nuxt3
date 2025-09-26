import { type VNode, Comment, Text } from 'vue'

export const extractTextFromVNodes = (nodes: VNode[]): string => {
  let text = ''
  for (const node of nodes) {
    if (node.type === Text) {
      text += node.children
    } else if (node.type === Comment) {
      continue
    } else if (Array.isArray(node.children)) {
      text += extractTextFromVNodes(node.children as VNode[])
    }
  }
  return text
}
