import { $command, $useKeymap } from '@milkdown/kit/utils'
import { linkSchema } from '@milkdown/kit/preset/commonmark'
import { commandsCtx } from '@milkdown/kit/core'
import type { MarkType } from '@milkdown/kit/prose/model'
import type { EditorState } from '@milkdown/prose/state'

const hasMark = (state: EditorState, type: MarkType) => {
  if (!type) {
    return false
  }
  const { from, $from, to, empty } = state.selection
  if (empty) {
    // @ts-expect-error it's a milkdown type change
    return !!type.isInSet(state.storedMarks || $from.marks())
  }
  // @ts-expect-error it's a milkdown type change
  return state.doc.rangeHasMark(from, to, type)
}

export const stopLinkCommand = $command('StopLink', (ctx) => () => {
  return (state, dispatch) => {
    const markType = linkSchema.type(ctx)
    const checkMark = hasMark(state, markType)
    if (checkMark) {
      // @ts-expect-error it's a milkdown type change
      dispatch?.(state.tr.removeStoredMark(markType))
    }
    return false
  }
})

export const linkCustomKeymap = $useKeymap('linkCustomKeymap', {
  StopLink: {
    shortcuts: ['Space'],
    command: (ctx) => {
      const commands = ctx.get(commandsCtx)
      return () => commands.call(stopLinkCommand.key)
    }
  }
})
