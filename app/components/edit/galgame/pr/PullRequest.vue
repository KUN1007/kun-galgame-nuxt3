<script setup lang="ts">
const introductionLanguage = ref<Language>('zh-cn')
</script>

<template>
  <ClientOnly>
    <KunCard :is-hoverable="false" :is-transparent="false" class="space-y-6">
      <EditGalgamePrHelp />

      <EditGalgamePrTitle />

      <EditGalgameEditor :lang="introductionLanguage" type="rewrite" />

      <EditGalgamePrSeries />

      <EditGalgamePrOfficial />

      <EditGalgamePrEngine />

      <EditGalgamePrTags />

      <EditGalgamePrAlias />

      <EditGalgamePrFooter />
    </KunCard>
  </ClientOnly>
</template>
