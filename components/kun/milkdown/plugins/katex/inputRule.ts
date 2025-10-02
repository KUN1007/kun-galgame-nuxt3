import { codeBlockSchema } from '@milkdown/kit/preset/commonmark'
import { nodeRule } from '@milkdown/kit/prose'
import { textblockTypeInputRule } from '@milkdown/kit/prose/inputrules'
import { $inputRule } from '@milkdown/kit/utils'
import { TextSelection } from '@milkdown/kit/prose/state'

import { mathInlineSchema } from './inlineKatex'

export const mathInlineInputRule = $inputRule((ctx) =>
  nodeRule(/(?:\$)([^$]+)(?:\$)$/, mathInlineSchema.type(ctx), {
    getAttr: (match) => ({ value: match[1] ?? '' }),
    beforeDispatch: ({ tr, start }) => {
      // After replaceRangeWith, insert a zero-width space after the inline math atom
      // so ProseMirror doesn't need to render a trailing <br>, avoiding caret newline.
      const posAfter = start + 1
      tr.insertText('\u200B', posAfter, posAfter)
      // Move selection to after the inserted ZWSP so caret is visually right after math.
      tr.setSelection(TextSelection.create(tr.doc, posAfter + 1))
    }
  })
)

export const mathBlockInputRule = $inputRule((ctx) =>
  textblockTypeInputRule(/^\$\$[\s\n]$/, codeBlockSchema.type(ctx), () => ({
    language: 'LaTeX'
  }))
)
