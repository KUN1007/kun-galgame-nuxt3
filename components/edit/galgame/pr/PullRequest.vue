<script setup lang="ts">
const introductionLanguage = ref<Language>('zh-cn')
</script>

<template>
  <ClientOnly>
    <KunCard :is-hoverable="false" :is-transparent="false" class="space-y-6">
      <EditGalgamePrHelp />

      <EditGalgamePrTitle />

      <EditGalgameEditor :lang="introductionLanguage" type="rewrite" />

      <EditGalgamePrSeries type="rewrite" />

      <EditGalgamePrOfficial type="rewrite" />

      <EditGalgamePrEngine type="rewrite" />

      <EditGalgamePrTags type="rewrite" />

      <EditGalgamePrAlias type="rewrite" />

      <EditGalgamePrFooter />
    </KunCard>
  </ClientOnly>
</template>
