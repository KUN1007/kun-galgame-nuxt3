export interface CommentDraft {
  tid: number
  rid: number
  toUid: number
  toUsername: string
  content: string

  // Which reply's comment panel to display
  isShowCommentPanelRid: number
}
