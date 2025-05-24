// Reference: https://github.com/jiannei/coditor/blob/main/packages/plugin-placeholder/src/index.ts

import { Plugin, PluginKey } from '@milkdown/prose/state'
import { $ctx, $prose } from '@milkdown/utils'
import type { EditorView } from '@milkdown/prose/view'
import type { Ctx, MilkdownPlugin } from '@milkdown/ctx'

export const placeholderCtx = $ctx('', 'placeholderCtx')

export const placeholderPlugin: MilkdownPlugin = $prose((ctx: Ctx) => {
  const update = (view: EditorView) => {
    const doc = view.state.doc
    if (
      doc.childCount === 1 &&
      doc.firstChild?.isTextblock &&
      doc.firstChild?.content.size === 0 &&
      doc.firstChild?.type.name === 'paragraph'
    )
      view.dom.setAttribute('data-placeholder', ctx.get(placeholderCtx.key))
    else view.dom.removeAttribute('data-placeholder')
  }

  return new Plugin({
    key: new PluginKey('KUN_MILKDOWN_PLACEHOLDER_PLUGIN'),
    view(view) {
      update(view)

      return { update }
    }
  })
})
