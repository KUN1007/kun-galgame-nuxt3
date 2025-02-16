<script setup lang="ts">
const introductionLanguage = ref<Language>('zh-cn')
</script>

<template>
  <div class="container">
    <EditGalgamePrHelp />

    <EditGalgamePrTitle />

    <EditGalgameIntroduction
      :introduction-language="introductionLanguage"
      type="rewrite"
      @set="(value) => (introductionLanguage = value as Language)"
    />

    <EditGalgamePrSeries />

    <EditGalgamePrOfficial />

    <EditGalgamePrEngine />

    <EditGalgamePrTags />

    <EditGalgamePrAlias />

    <EditGalgamePrFooter />
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  padding: 17px;
}
</style>
