import { codeBlockSchema } from '@milkdown/kit/preset/commonmark'
import { nodeRule } from '@milkdown/kit/prose'
import { textblockTypeInputRule } from '@milkdown/kit/prose/inputrules'
import { $inputRule } from '@milkdown/kit/utils'

import { mathInlineSchema } from './inlineKatex'

export const mathInlineInputRule = $inputRule((ctx) =>
  nodeRule(/(?:\$)([^$]+)(?:\$)$/, mathInlineSchema.type(ctx), {
    getAttr: (match) => ({ value: match[1] ?? '' })
  })
)

export const mathBlockInputRule = $inputRule((ctx) =>
  textblockTypeInputRule(/^\$\$[\s\n]$/, codeBlockSchema.type(ctx), () => ({
    language: 'LaTeX'
  }))
)
