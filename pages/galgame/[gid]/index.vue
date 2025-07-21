<script setup lang="ts">
import type {
  VideoGame,
  WithContext,
  Person,
  CreativeWorkSeries
} from 'schema-dts'

const uid = storeToRefs(usePersistUserStore()).id.value
const route = useRoute()

const gid = computed(() => {
  return parseInt((route.params as { gid: string }).gid)
})

const { data } = await useFetch(`/api/galgame/${gid.value}`, {
  method: 'GET',
  watch: false,
  query: { galgameId: gid.value },
  ...kungalgameResponseHandler
})

const galgame = data.value
const isShowGalgame = ref(true)

if (galgame) {
  if (galgame === 'banned') {
    useHead({
      meta: [{ name: 'robots', content: 'noindex, nofollow' }]
    })
    useKunSeoMeta({
      title: data.value
        ? '这个 Galgame 已被封禁'
        : '未找到这个 Galgame 资源 wiki',
      description: data.value
        ? `这个 Galgame 由于违反了 ${kungal.titleShort} 资源发布规定, 或者被作者删除, 您可以进入 Galgame 总览页面查看其它相似 Galgame 资源 wiki`
        : `未找到这个 Galgame, 请确认您的请求路径是否正确, 您可以进入 Galgame 页面查看其它 Galgame`
    })
  } else if (galgame.contentLimit === 'nsfw') {
    const title = getPreferredLanguageText(galgame.name)
    useKunDisableSeo(uid ? title : '')

    if (!uid) {
      isShowGalgame.value = false
    }
  } else {
    const titleBase = getPreferredLanguageText(galgame.name)
    const jaTitle = galgame.name['ja-jp']
    const title =
      jaTitle && titleBase !== jaTitle ? `${titleBase} | ${jaTitle}` : titleBase
    const pageUrl = `${kungal.domain.main}${route.path}`
    const description = markdownToText(
      getPreferredLanguageText(galgame.markdown)
    )
      .slice(0, 175)
      .replace(/\\|\n/g, '')

    const jsonLd: WithContext<VideoGame> = {
      '@context': 'https://schema.org',
      '@type': 'VideoGame',
      name: titleBase,
      alternateName: galgame.alias,
      url: pageUrl,
      image: galgame.banner,
      description: description,
      inLanguage: galgame.originalLanguage,
      datePublished: new Date(galgame.created).toISOString(),
      dateModified: new Date(galgame.updated).toISOString(),
      publisher: galgame.official.map((o) => ({
        '@type': 'Organization',
        name: o.name
      })),

      genre: galgame.tag
        .filter((t) => t.category === 'content')
        .map((t) => t.name),
      keywords: galgame.tag
        .filter((t) => t.category === 'technical')
        .map((t) => t.name)
        .join(', '),

      ...(galgame.series && {
        isPartOf: {
          '@type': 'CreativeWorkSeries',
          name: galgame.series.name,
          url: `${kungal.domain.main}/series/${galgame.series.id}`
        } satisfies CreativeWorkSeries
      }),

      interactionStatistic: [
        {
          '@type': 'InteractionCounter',
          interactionType: {
            '@type': 'LikeAction'
          },
          userInteractionCount: galgame.likeCount
        },
        {
          '@type': 'InteractionCounter',
          interactionType: {
            '@type': 'WatchAction'
          },
          userInteractionCount: galgame.view
        }
      ],

      author: {
        '@type': 'Person',
        name: galgame.user.name
      } satisfies Person,
      contributor: galgame.contributor.map((c) => ({
        '@type': 'Person',
        name: c.name
      })) satisfies Person[]
    }

    useHead({
      script: [
        {
          id: 'schema-org-video-game',
          type: 'application/ld+json',
          innerHTML: jsonLd
        }
      ]
    })

    useKunSeoMeta({
      title,
      description,
      ogImage: galgame.banner,
      articleAuthor: [`${kungal.domain.main}/user/${galgame.user.id}/info`],
      articlePublishedTime: galgame.created.toString(),
      articleModifiedTime: galgame.updated.toString()
    })
  }
} else {
  useKunDisableSeo('请求 Galgame 错误')
}
</script>

<template>
  <div>
    <div v-if="data && data !== 'banned'">
      <Galgame v-if="isShowGalgame" :galgame="data" />

      <KunCard v-else :is-hoverable="false" :is-transparent="false">
        <p>这个 Galgame 含有 NSFW 内容, 您需要点击确认以显示这个 Galgame</p>
        <KunButton @click="isShowGalgame = true">确认显示</KunButton>
      </KunCard>
    </div>

    <KunNull
      v-if="!data && data !== 'banned'"
      description="未找到这个 Galgame"
    />
    <KunNull v-if="data === 'banned'" description="此 Galgame 已被封禁" />
  </div>
</template>
