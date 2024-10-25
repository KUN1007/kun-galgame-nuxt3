<script setup lang="ts">
const { t, locale } = useI18n()

useHead({
  title: `${t('seo.thanksList.title')} - ${t('head.title')}`,
  meta: [
    {
      name: 'description',
      content: t('seo.thanksList.description')
    }
  ]
})
</script>

<template>
  <div class="root">
    <div class="container">
      <div class="title">{{ $t('kungalgame.thanks') }}</div>

      <I18nThanksListContentEN v-if="locale === 'en-us'" />
      <I18nThanksListContentJP v-if="locale === 'ja-jp'" />
      <I18nThanksListContentCN v-if="locale === 'zh-cn'" />
      <I18nThanksListContentTW v-if="locale === 'zh-tw'" />

      <KunFooter style="margin-top: 60px" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.root {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: calc(100dvh + 75px);
}

.container {
  width: 100%;
  max-width: 80rem;
  margin: 0 auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;

  @include kun-blur;
}

.title {
  font-size: 30px;
  margin-bottom: 30px;
}

.article {
  display: flex;
  flex-direction: column;
}

.skip {
  border-bottom: 1.5px solid var(--kungalgame-blue-5);
  cursor: pointer;

  a {
    color: var(--kungalgame-blue-5);
  }
}

.list {
  padding: 0;
  margin: 0;

  & > li {
    list-style: inside;
    margin: 5px 0;
  }
}

p {
  margin: 5px;
}
</style>
