<script setup lang="ts">
const { t, locale } = useI18n()

useHead({
  title: `${t('seo.bylaw.title')} - ${t('head.title')}`,
  meta: [
    {
      name: 'description',
      content: t('seo.bylaw.description')
    }
  ]
})
</script>

<template>
  <div class="root">
    <div class="container">
      <BylawContentEN v-if="locale === 'en-us'" />

      <BylawContentCN v-if="locale === 'zh-cn'" />

      <KunFooter style="position: absolute; bottom: 2%" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.root {
  height: 100%;
  min-height: calc(100vh - 75px);
  display: flex;
  flex-direction: column;
}

.container {
  margin: 0 auto;
  padding: 10px;
  transition: width 0.2s;
  width: 100%;
  max-width: 64rem;
  height: 100%;
  flex-direction: column;
  position: relative;

  @include kun-blur;
  @include kun-center;
}

@media (max-width: 1000px) {
  .container {
    width: 100%;
  }
}

@media (max-width: 700px) {
  .container {
    width: 95%;
  }
}
</style>
