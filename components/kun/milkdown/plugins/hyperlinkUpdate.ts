import type { EditorView } from '@milkdown/prose/view'
import type { Node } from '@milkdown/prose/model'
import { linkSchema } from '@milkdown/preset-commonmark'
import type { Ctx } from '@milkdown/ctx'

export const handleClickOn = (
  ctx: Ctx,
  view: EditorView,
  pos: number,
  node: Node /*, nodePos: number, event: MouseEvent, direct: boolean*/
) => {
  if (!node.isLeaf) {
    return false
  }
  const linkType = linkSchema.type(ctx)
  if (!node.marks.find((mark) => mark.type == linkType)) {
    return false
  }

  return true
}
