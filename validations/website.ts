import { z } from 'zod'

/* website */

export const getWebsiteDetailSchema = z.object({
  domain: z.string().max(100, '网站可用域名最多 100 个字符')
})

export const createWebsiteSchema = z.object({
  name: z.string().min(1, '网站名称不能为空').max(30, '网站名称最多 30 个字符'),
  url: z.string().max(100, '网站 URL 最多 100 个字符'),
  description: z
    .string()
    .min(10, '网站介绍最少 10 个字符')
    .max(170, '网站介绍最多 170 个字符'),
  icon: z.string().url('无效的图标 URL').max(300, '图标 URL 最多 300 个字符'),
  language: z.enum(['en-us', 'ja-jp', 'zh-cn', 'zh-tw']).default('zh-cn'),
  age_limit: z.enum(['all', 'r18']).default('all'),
  category_id: z.coerce.number().min(1).max(9999999),
  tag_ids: z
    .array(z.coerce.number().min(1).max(9999999))
    .max(20, '网站最多 20 个标签')
    .optional()
    .default([]),
  domain: z
    .array(z.string().max(100, '网站可用域名最多 100 个字符'))
    .optional()
    .default([]),
  create_time: z.string().min(1).max(20, '网站创建时间描述最多 20 个字符')
})

export const updateWebsiteSchema = createWebsiteSchema.merge(
  z.object({
    websiteId: z.coerce.number().min(1).max(9999999)
  })
)

export const toggleLikeFavoriteSchema = z.object({
  websiteId: z.coerce.number().min(1).max(9999999)
})

export const deleteWebsiteSchema = z.object({
  websiteId: z.coerce.number().min(1).max(9999999)
})

/* tag */

export const getWebsiteTagSchema = z.object({
  websiteId: z.coerce.number().min(1).max(9999999).optional()
})

export const getWebsiteByTagSchema = z.object({
  name: z.string().min(1, '标签名称不能为空').max(30, '标签名称最多 30 个字符')
})

export const createWebsiteTagSchema = z.object({
  name: z.string().min(1, '标签名称不能为空').max(30, '标签名称最多 30 个字符'),
  label: z
    .string()
    .min(1, '标签 label 不能为空')
    .max(30, '标签 label 最多 30 个字符'),
  level: z.coerce
    .number()
    .int('标签等级必须是整数')
    .max(20, '网站标签等级最大为 20'),
  description: z.string().max(300, '网站标签描述最多 300 个字符').optional()
})

export const updateWebsiteTagSchema = createWebsiteTagSchema.merge(
  z.object({
    tagId: z.coerce.number().min(1).max(9999999)
  })
)

export const deleteWebsiteTagSchema = z.object({
  tagId: z.coerce.number().min(1).max(9999999)
})

/* category */

export const getWebsiteByCategorySchema = z.object({
  name: z.string().min(1, '分类名称不能为空').max(30, '分类名称最多 30 个字符')
})

export const updateWebsiteCategorySchema = z.object({
  categoryId: z.coerce.number().min(1).max(9999999),
  name: z.string().min(1, '分类名称不能为空').max(30, '分类名称最多 30 个字符'),
  label: z
    .string()
    .min(1, '分类 label 不能为空')
    .max(30, '分类 label 最多 30 个字符'),
  description: z.string().max(300, '网站分类描述最多 300 个字符').optional()
})

/* comment */

export const getCommentsSchema = z.object({
  websiteId: z.coerce.number().min(1).max(9999999)
})

export const createCommentSchema = z.object({
  websiteId: z.coerce.number().min(1).max(9999999),
  content: z
    .string()
    .min(1, '评论内容不能为空')
    .max(1007, '评论内容最多 1007 个字符'),
  parentId: z.coerce.number().min(1).max(9999999).optional()
})

export const updateCommentSchema = z.object({
  websiteId: z.coerce.number().min(1).max(9999999),
  content: z
    .string()
    .min(1, '评论内容不能为空')
    .max(1007, '评论内容最多 1007 个字符')
})

export const deleteCommentSchema = z.object({
  commentId: z.coerce.number().min(1).max(9999999)
})
