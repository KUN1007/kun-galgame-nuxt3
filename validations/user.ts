import { z } from 'zod'
import { isValidName, isValidEmail, isValidPassword } from '~/utils/validate'
import {
  KUN_USER_PAGE_TOPIC_TYPE,
  KUN_USER_PAGE_REPLY_TYPE,
  KUN_USER_PAGE_COMMENT_TYPE,
  KUN_USER_PAGE_GALGAME_TYPE,
  KUN_USER_PAGE_GALGAME_RESOURCE_TYPE
} from '~/constants/user'

export const getUserInfoSchema = z.object({
  userId: z.coerce.number().min(1).max(9999999)
})

export const getUserFloatingCardSchema = z.object({
  userId: z.coerce.number().min(1).max(9999999)
})

export const getUserTopicSchema = z.object({
  userId: z.coerce.number().min(1).max(9999999),
  page: z.coerce.number().min(1).max(9999999),
  limit: z.coerce.number().min(1).max(50),
  type: z.enum(KUN_USER_PAGE_TOPIC_TYPE)
})

export const getUserReplySchema = z.object({
  userId: z.coerce.number().min(1).max(9999999),
  page: z.coerce.number().min(1).max(9999999),
  limit: z.coerce.number().min(1).max(50),
  type: z.enum(KUN_USER_PAGE_REPLY_TYPE)
})

export const getUserCommentSchema = z.object({
  userId: z.coerce.number().min(1).max(9999999),
  page: z.coerce.number().min(1).max(9999999),
  limit: z.coerce.number().min(1).max(50),
  type: z.enum(KUN_USER_PAGE_COMMENT_TYPE)
})

export const getUserGalgameSchema = z.object({
  userId: z.coerce.number().min(1).max(9999999),
  page: z.coerce.number().min(1).max(9999999),
  limit: z.coerce.number().min(1).max(24),
  type: z.enum(KUN_USER_PAGE_GALGAME_TYPE)
})

export const getUserGalgameResourceSchema = z.object({
  userId: z.coerce.number().min(1).max(9999999),
  page: z.coerce.number().min(1).max(9999999),
  limit: z.coerce.number().min(1).max(50),
  type: z.enum(KUN_USER_PAGE_GALGAME_RESOURCE_TYPE)
})

export const getUserRatingSchema = z.object({
  userId: z.coerce.number().min(1).max(9999999),
  page: z.coerce.number().min(1).max(9999999),
  limit: z.coerce.number().min(1).max(50)
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

export const deleteUserSchema = z.object({
  userId: z.coerce.number().min(1).max(9999999)
})

export const updateBanUserSchema = z.object({
  userId: z.coerce.number().min(1).max(9999999)
})
