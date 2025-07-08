import { z } from 'zod'
import { isValidName, isValidEmail, isValidPassword } from '~/utils/validate'

export const getUserInfoSchema = z.object({
  userId: z.coerce.number().min(1).max(9999999)
})

export const getUserTopicSchema = z.object({
  page: z.coerce.number().min(1).max(9999999),
  limit: z.coerce.number().min(1).max(50),
  type: z.enum(['topic', 'topic_like', 'topic_upvote', 'topic_favorite'])
})

export const getUserReplySchema = z.object({
  page: z.coerce.number().min(1).max(9999999),
  limit: z.coerce.number().min(1).max(50),
  type: z.enum(['reply_created', 'reply_target', 'reply_like'])
})

export const getUserCommentSchema = z.object({
  page: z.coerce.number().min(1).max(9999999),
  limit: z.coerce.number().min(1).max(50),
  type: z.enum(['comment_created', 'comment_target', 'comment_like'])
})

export const getUserGalgameSchema = z.object({
  page: z.coerce.number().min(1).max(9999999),
  limit: z.coerce.number().min(1).max(50),
  type: z.enum([
    'galgame',
    'galgame_like',
    'galgame_favorite',
    'galgame_contribute',
    'galgame_pr',
    'galgame_history',
    'galgame_link',
    'galgame_comment',
    'galgame_comment_target',
    'galgame_comment_like'
  ])
})

export const getUserGalgameResourceSchema = z.object({
  userId: z.coerce.number().min(1).max(9999999),
  page: z.coerce.number().min(1).max(9999999),
  limit: z.coerce.number().min(1).max(50),
  type: z.enum(['valid', 'expire', 'galgame_resource_like'])
})

export const updateUserBioSchema = z.object({
  bio: z.string().max(107, { message: '签名最大长度为 107 个字符' })
})

export const updateUsernameSchema = z.object({
  username: z.string().refine((s) => isValidName(s) || isValidEmail(s), {
    message: '非法的用户名'
  })
})

export const userUpdateEmailSchema = z.object({
  codeSalt: z.string().min(64).max(64),
  email: z.string().email(),
  code: z.string().min(7).max(7)
})

export const userLoginSchema = z.object({
  name: z.string().refine((s) => isValidName(s) || isValidEmail(s), {
    message: '非法的用户名'
  }),
  password: z.string().refine((s) => isValidPassword(s), {
    message:
      '非法的密码格式，密码的长度为 6 到 107 位，必须包含至少一个英文字符和一个数字，可以选择性的包含 @!#$%^&*()_-+=\\/ 等特殊字符'
  })
})

export const userUpdatePasswordSchema = z.object({
  oldPassword: z.string().refine((s) => isValidPassword(s), {
    message:
      '旧密码格式错误，密码的长度为 6 到 107 位，必须包含至少一个英文字符和一个数字，可以选择性的包含 @!#$%^&*()_-+=\\/ 等特殊字符'
  }),
  newPassword: z.string().refine((s) => isValidPassword(s), {
    message:
      '新密码格式错误，密码的长度为 6 到 107 位，必须包含至少一个英文字符和一个数字，可以选择性的包含 @!#$%^&*()_-+=\\/ 等特殊字符'
  })
})

export const userRegisterSchema = userLoginSchema.merge(userUpdateEmailSchema)
