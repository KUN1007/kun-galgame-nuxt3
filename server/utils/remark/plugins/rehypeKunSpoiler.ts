import type { Plugin } from 'unified'
import type { Root, Element } from 'hast'
import { visit } from 'unist-util-visit'

// TODO:
export const rehypeKunSpoiler: Plugin<[], Root> = () => {
  return (tree) => {}
}
