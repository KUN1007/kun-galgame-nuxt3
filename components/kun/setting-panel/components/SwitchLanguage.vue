<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()

const availableLocales = computed(() => {
  return locales.value.filter((i) => i.code !== locale.value)
})
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
