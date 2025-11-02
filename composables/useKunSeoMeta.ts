import type {
  ActiveHeadEntry,
  UseHeadOptions,
  UseSeoMetaInput
} from '@unhead/vue'
import type { NuxtApp } from '#app/nuxt'

interface NuxtUseHeadOptions extends UseHeadOptions {
  nuxt?: NuxtApp
}

/**
 * title, description, ogType?, ogImage? required
 */
export const useKunSeoMeta = (
  input: Omit<
    UseSeoMetaInput,
    | 'ogUrl'
    | 'ogTitle'
    | 'ogDescription'
    | 'twitterCard'
    | 'twitterTitle'
    | 'twitterDescription'
    | 'twitterImage'
    | 'twitterImageAlt'
  >,
  options?: NuxtUseHeadOptions
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
): ActiveHeadEntry<UseSeoMetaInput> | void => {
  const title = `${input.title?.toString()} - ${kungal.title}`
  const description = input.description?.toString()
  const route = useRoute()

  const pageUrl = `${kungal.domain.main}${route.path}`

  useSeoMeta(
    {
      title,
      description,
      keywords: kungal.keywords.toString(),
      ogUrl: pageUrl,
      ogType: input.ogType || 'website',
      ogTitle: title,
      ogDescription: description,
      ogImage: input.ogImage || kungal.images[0].fullUrl,
      ogImageAlt: title,
      twitterCard: 'summary_large_image',
      twitterTitle: title,
      twitterDescription: description,
      twitterImage: input.ogImage || kungal.images[0].fullUrl,
      twitterImageAlt: title,
      ...input
    },
    options
  )

  // if (!input.ogImage) {
  //   defineOgImageComponent('Kun', {
  //     title: title.split('-')[0] || title,
  //     description,
  //     headline: input.ogHeadline,
  //     icon: input.ogUserAvatar
  //   })
  // }

  useHead({
    link: [{ rel: 'canonical', href: pageUrl }]
  })
}
