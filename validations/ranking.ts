import { z } from 'zod'

export const getUserRankingSchema = z.object({
  page: z.coerce.number().min(1).max(9999999),
  limit: z.coerce.number().min(1).max(100),
  sortField: z.enum([
    'moemoepoint',
    'follower_relation',
    'topic',
    'reply_created',
    'comment_created',
    'galgame',
    'galgame_resource'
  ]),
  sortOrder: z.enum(['asc', 'desc'])
})

export const getTopicRankingSchema = z.object({
  page: z.coerce.number().min(1).max(9999999),
  limit: z.coerce.number().min(1).max(100),
  sortField: z.enum(['view', 'upvote', 'like', 'favorite', 'reply', 'comment']),
  sortOrder: z.enum(['asc', 'desc'])
})

export const getGalgameRankingSchema = z.object({
  page: z.coerce.number().min(1).max(9999999),
  limit: z.coerce.number().min(1).max(100),
  sortField: z.enum(['view', 'like', 'favorite', 'resource']),
  sortOrder: z.enum(['asc', 'desc'])
})
