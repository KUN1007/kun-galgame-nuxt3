export const useKunDisableSeo = (title: string) => {
  useHead({
    htmlAttrs: { lang: 'zh-Hans' },
    meta: [
      { name: '', content: '' },
      { name: 'robots', content: 'noindex, nofollow' }
    ],
    templateParams: {
      schemaOrg: {
        host: '',
        path: '',
        inLanguage: 'zh-Hans'
      }
    }
  })

  useSeoMeta({
    title,
    description: '',
    themeColor: '',

    ogDescription: '',
    ogLocale: 'zh_CN',
    ogTitle: '',
    ogSiteName: '',
    ogType: 'website',

    // use absolute URLs
    ogImage: '',
    ogImageAlt: '',

    ogImageWidth: '',
    ogImageHeight: '',
    ogImageType: undefined,
    ogImageUrl: '',

    twitterCard: undefined,
    twitterImage: '',
    twitterTitle: '',
    twitterDescription: ''
  })

  useSchemaOrg([defineOrganization({}), defineWebSite({}), defineWebPage()])
}
