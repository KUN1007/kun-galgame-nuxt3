<script setup lang="ts">
const { t, locale } = useI18n()

useHead({
  title: `${t('seo.kungalgame.title')} - ${t('head.title')}`,
  meta: [
    {
      name: 'description',
      content: t('seo.kungalgame.description')
    }
  ]
})
</script>

<template>
  <div class="content-container">
    <KungalgameAside class="aside" />

    <div class="content">
      <I18nKungalgameContentEN v-if="locale === 'en-us'" />
      <I18nKungalgameContentJP v-if="locale === 'ja-jp'" />
      <I18nKungalgameContentCN v-if="locale === 'zh-cn'" />
      <I18nKungalgameContentTW v-if="locale === 'zh-tw'" />

      <KunFooter style="padding-bottom: 20px" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content-container {
  border-radius: 7px;
  height: calc(100dvh - 75px);
  transition: width 0.2s;
  max-width: 80rem;
  margin: auto;
  display: flex;
}

.content {
  height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 0 30px;

  @include kun-blur;
}

@media (max-width: 700px) {
  .content-container {
    margin: 0 5px;
    height: calc(100dvh - 63px);
  }

  .aside {
    display: none;
  }
}
</style>
