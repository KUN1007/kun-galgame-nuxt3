<script setup lang="ts">
import { languageItems } from '~/constants/edit'

const introductionLanguage = ref<Language>('zh-cn')
</script>

<template>
  <ClientOnly>
    <KunCard
      :is-hoverable="false"
      :is-transparent="false"
      content-class="space-y-6"
    >
      <EditGalgamePrHelp />

      <EditGalgamePrTitle />

      <EditGalgameContentLimit type="rewrite" />

      <KunTab
        :items="languageItems"
        v-model="introductionLanguage"
        variant="underlined"
        color="primary"
        size="sm"
      />
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
