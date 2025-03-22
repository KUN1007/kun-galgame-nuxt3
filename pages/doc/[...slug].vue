<script setup lang="ts">
const route = useRoute()
const { data } = await useAsyncData(() => {
  return queryCollection('content').path(route.path).first()
})
</script>

<template>
  <KunCard :is-hoverable="false" :is-transparent="false" v-if="data">
    <DocDetailBackgroundImage :src="data.banner" />

    <div class="flex gap-3">
      <DocDetailCategoryTree />

      <article>
        <DocDetailHeader :metadata="{ ...data }" />
        <ContentRenderer class="kun-prose" :value="data" />
      </article>

      <DocDetailTableOfContent :toc="data.body.toc" />
    </div>
  </KunCard>
</template>
