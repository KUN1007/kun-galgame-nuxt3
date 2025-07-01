import type {
  ActiveHeadEntry,
  UseHeadOptions,
  UseSeoMetaInput
} from '@unhead/vue'
import type { NuxtApp } from '#app/nuxt'

interface NuxtUseHeadOptions extends UseHeadOptions {
  nuxt?: NuxtApp
}

export const useKunSeoMeta = (
  input: Omit<
    UseSeoMetaInput,
    'ogTitle' | 'ogDescription' | 'twitterTitle' | 'twitterDescription'
  >,
  options?: NuxtUseHeadOptions
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
): ActiveHeadEntry<UseSeoMetaInput> | void => {
  useSeoMeta(
    {
      ogTitle: input.title?.toString(),
      ogDescription: input.description?.toString(),
      twitterTitle: input.title?.toString(),
      twitterDescription: input.description?.toString(),
      ...input
    },
    options
  )
}
