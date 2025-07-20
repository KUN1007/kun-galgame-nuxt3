<script setup lang="ts">
const route = useRoute()
const { data: post } = await useAsyncData(() => {
  return queryCollection('content').path(route.path).first()
})

const { images, isLightboxOpen, currentImageIndex } = useKunLightbox()

useHead({
  link: [{ rel: 'canonical', href: `${kungal.domain.main}${post.value?.path}` }]
})

useKunSeoMeta({
  title: post.value?.title,
  description: post.value?.description,
  ogImage: post.value?.banner,
  ogType: 'article',
  articleAuthor: [`${kungal.domain.main}/user/${post.value?.authorUid}/info`],
  articlePublishedTime: post.value?.publishedTime.toString(),
  articleModifiedTime: post.value?.modifiedTime.toString()
})
</script>

<template>
  <KunCard
    :is-hoverable="false"
    :is-transparent="false"
    v-if="post"
    class-name="backdrop-blur-none pb-6 min-h-[calc(100dvh-6rem)]"
  >
    <DocDetailBackgroundImage :src="post.banner" />

    <div class="flex">
      <DocDetailCategoryTree />

      <article class="space-y-6 pl-0 lg:pr-67 xl:pl-67">
        <KunLightbox
          :images="images"
          v-model:is-open="isLightboxOpen"
          :initial-index="currentImageIndex"
        />

        <DocDetailHeader :metadata="{ ...post }" />
        <ContentRenderer class="kun-prose" :value="post" />
        <DocDetailFooter />
      </article>

      <div>
        <div class="fixed -translate-x-67">
          <DocDetailTableOfContent :toc="post.body.toc" />
        </div>
      </div>
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
