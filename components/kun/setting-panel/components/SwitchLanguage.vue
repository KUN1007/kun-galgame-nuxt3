<script setup lang="ts">
const { availableLocales, setLocale } = useI18n()
</script>

<template>
  <div class="set-lang">
    <span>{{ $t('header.settings.language') }}</span>

    <KunSelect :options="availableLocales" @set="(value) => setLocale(value)" />
  </div>
</template>

<style lang="scss" scoped>
.set-lang {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
</style>
