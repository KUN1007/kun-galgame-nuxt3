<script setup lang="ts">
const route = useRoute()
const { data } = await useAsyncData(() => {
  return queryCollection('content').path(route.path).first()
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
        <DocDetailHeader :metadata="{ ...data }" />
        <ContentRenderer class="kun-prose" :value="data" />
        <DocDetailFooter />
      </article>

      <DocDetailTableOfContent :toc="data.body.toc" />
    </div>
  </KunCard>
</template>
