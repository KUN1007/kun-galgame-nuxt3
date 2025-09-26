import type { z } from 'zod'
import type {
  createWebsiteSchema,
  updateWebsiteSchema,
  createWebsiteTagSchema,
  updateWebsiteTagSchema,
  updateWebsiteCategorySchema
} from '~/validations/website'

export type CreateWebsitePayload = z.infer<typeof createWebsiteSchema>
export type UpdateWebsitePayload = z.infer<typeof updateWebsiteSchema>
export type CreateWebsiteTagPayload = z.infer<typeof createWebsiteTagSchema>
export type UpdateWebsiteTagPayload = z.infer<typeof updateWebsiteTagSchema>
export type UpdateWebsiteCategoryPayload = z.infer<
  typeof updateWebsiteCategorySchema
>
