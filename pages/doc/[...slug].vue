<script setup lang="ts">
const route = useRoute()
const { data } = await useAsyncData(() => {
  return queryCollection('content').path(route.path).first()
})
</script>

<template>
  <KunCard :is-hoverable="false" :is-transparent="false" v-if="data">
    <div class="flex gap-3">
      <DocDetailCategoryTree />

      <article>
        <DocDetailHeader :metadata="{ ...data }" />
        <ContentRenderer class="kun-prose" :value="data" />
      </article>

      <aside class="hidden shrink-0 space-y-8 lg:block lg:w-64">
        <DocDetailTableOfContent :toc="data.body.toc" />
      </aside>
    </div>
  </KunCard>
</template>
