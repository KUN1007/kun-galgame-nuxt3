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

    <EditGalgamePrAlias />

    <EditGalgamePrFooter />
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-color: var(--kungalgame-trans-white-5);
  box-shadow: var(--kungalgame-shadow-0);
  backdrop-filter: blur(10px);
  padding: 17px;
}
</style>
