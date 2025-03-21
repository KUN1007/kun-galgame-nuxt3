<script setup lang="ts">
const route = useRoute()
const { data } = await useAsyncData(() => {
  return queryCollection('content').path(route.path).first()
})
</script>

<template>
  <KunCard :is-hoverable="false" :is-transparent="false" v-if="data">
    <div class="flex gap-3">
      <DocCategoryTree />

      <article>
        <h1 class="mb-8">{{ data.title }}</h1>
        <ContentRenderer class="kun-prose" :value="data" />
      </article>

      <aside class="hidden shrink-0 space-y-8 lg:block lg:w-64">
        <DocTableOfContent :toc="data.body.toc" />
      </aside>
    </div>
  </KunCard>
</template>
