<script setup lang="ts">
const route = useRoute()
const data = await queryCollection('content').path(route.path).first()

const { images, isLightboxOpen, currentImageIndex } = useKunLightbox()

useHead({
  link: [{ rel: 'canonical', href: `${kungal.domain.main}${data?.path}` }]
})

useKunSeoMeta({
  title: data?.title,
  description: data?.description,

  ogImage: data?.banner,
  ogUrl: `${kungal.domain.main}${data?.path}`,
  ogType: 'article',

  twitterImage: `${kungal.domain.main}${data?.banner}`,
  twitterCard: 'summary_large_image',

  articleAuthor: [`${kungal.domain.main}/user/${data?.authorUid}/info`],
  articlePublishedTime: data?.publishedTime.toString(),
  articleModifiedTime: data?.modifiedTime.toString()
})
</script>

<template>
  <KunCard
    :is-hoverable="false"
    :is-transparent="false"
    v-if="data"
    class-name="pb-6 min-h-[calc(100dvh-6rem)]"
  >
    <DocDetailBackgroundImage :src="data.banner" />

    <div class="flex">
      <DocDetailCategoryTree />

      <article class="space-y-6 pl-0 lg:pr-67 xl:pl-67">
        <KunLightbox
          :images="images"
          v-model:is-open="isLightboxOpen"
          :initial-index="currentImageIndex"
        />

        <DocDetailHeader :metadata="{ ...data }" />
        <ContentRenderer class="kun-prose" :value="data" />
        <DocDetailFooter />
      </article>

      <DocDetailTableOfContent :toc="data.body.toc" />
    </div>
  </KunCard>
</template>

<style lang="scss" scoped>
:deep(.kun-prose h1) {
  color: var(--color-default-900);
  text-decoration: none;
}

:deep(.kun-prose h2 a) {
  color: var(--color-default-900);
  text-decoration: none;
}

:deep(.kun-prose h3 a) {
  color: var(--color-default-900);
  text-decoration: none;
}
</style>
