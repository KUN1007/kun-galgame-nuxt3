<script setup lang="ts">
const introductionLanguage = ref<Language>('zh-cn')
</script>

<template>
  <div class="space-y-6">
    <EditGalgamePrHelp />

    <EditGalgamePrTitle />

    <EditGalgameEditor :lang="introductionLanguage" type="rewrite" />

    <EditGalgamePrSeries />

    <EditGalgamePrOfficial />

    <EditGalgamePrEngine />

    <EditGalgamePrTags />

    <EditGalgamePrAlias />

    <EditGalgamePrFooter />
  </div>
</template>
