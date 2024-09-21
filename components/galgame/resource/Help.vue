<script setup lang="ts">
const { locale } = useI18n()
</script>

<template>
  <div class="help">
    <I18nGalgameResourceHelpEN v-if="locale === 'en-us'" />
    <I18nGalgameResourceHelpJP v-if="locale === 'ja-jp'" />
    <I18nGalgameResourceHelpCN v-if="locale === 'zh-cn'" />
    <I18nGalgameResourceHelpTW v-if="locale === 'zh-tw'" />
  </div>
</template>

<style lang="scss" scoped>
.help {
  border-left: 5px solid var(--kungalgame-blue-5);
  padding-left: 17px;
  margin-bottom: 17px;
  font-size: small;

  p {
    margin-bottom: 7px;
  }

  a {
    font-weight: bold;
    color: var(--kungalgame-blue-5);
    text-decoration: underline;
    text-underline-offset: 3px;
    margin: 0 7px;
  }
}
</style>
