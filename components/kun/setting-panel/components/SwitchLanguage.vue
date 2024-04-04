<script setup lang="ts">
const { availableLocales, locale, setLocale } = useI18n()
</script>

<template>
  <div class="set-lang">
    <span>{{ $t('header.settings.language') }}</span>

    <KunSelect
      :styles="{ width: '110px' }"
      class="kun-select"
      :options="availableLocales"
      i18n="header.settings"
      @set="setLocale"
      :default-value="locale"
    >
      <span>{{ $t(`header.settings.${locale}`) }}</span>
    </KunSelect>
  </div>
</template>

<style lang="scss" scoped>
.set-lang {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.kun-select {
  width: 100px;
}
</style>
