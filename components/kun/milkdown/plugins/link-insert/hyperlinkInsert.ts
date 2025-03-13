import { linkSchema } from '@milkdown/preset-commonmark'
import { $command } from '@milkdown/utils'

export const insertLinkPlugin = $command(
  'InsertLink',
  (ctx) =>
    (payload: { href: string; text: string } | undefined) =>
    (state, dispatch?) => {
      if (!dispatch || !payload) {
        return false
      }

      const transaction = state.tr
      const linkMark = linkSchema.type(ctx).create({ href: payload.href })

      dispatch(
        transaction
          .addStoredMark(linkMark)
          .insertText(payload.text)
          .removeStoredMark(linkMark)
          .scrollIntoView()
      )
      return true
    }
)
