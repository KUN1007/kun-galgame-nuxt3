<script setup lang="ts">
const { locale } = useI18n()
const introductionLanguage = ref(locale.value as Language)
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

  @include kun-blur;
}
</style>
