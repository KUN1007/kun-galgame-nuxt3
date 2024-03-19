import type { EditorView } from 'prosemirror-view'
import type { Ctx } from '@milkdown/ctx'
import type { Node } from '@milkdown/prose/model'

const hasURLProtocol = (url: string) => {
  return (
    url.startsWith('http://') ||
    url.startsWith('https://') ||
    url.startsWith('file://') ||
    url.startsWith('data:') ||
    url.startsWith('ts://?ts') ||
    url.startsWith('ts:?ts')
  )
}

export const handleClick = (
  _: Ctx,
  view: EditorView,
  pos: number,
  __: Node
) => {
  const found = view.state.tr.doc.nodeAt(pos)

  if (found && found.marks.length > 0) {
    const mark = found.marks.find((m) => m.type.name === 'link')
    const href = mark?.attrs.href
    let path: string

    if (hasURLProtocol(href)) {
      path = href
    } else {
      path = encodeURIComponent(href)
    }

    window.open(path, '_blank', 'noopener noreferrer')
  }
  return true
}
