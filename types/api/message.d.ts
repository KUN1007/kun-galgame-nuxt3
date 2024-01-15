export type MessageType =
  | 'upvoted'
  | 'liked'
  | 'replied'
  | 'commented'
  | 'mentioned'
  | 'admin'

export type RelatedContent = 'topic' | 'reply' | 'comment'

export type MessageStatus = 'read' | 'unread'
