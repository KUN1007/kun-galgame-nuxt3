<script setup lang="ts">
const { t, locale } = useI18n()

useHead({
  title: `${t('seo.privacy.title')} - ${t('head.title')}`,
  meta: [
    {
      name: 'description',
      content: t('seo.privacy.description')
    }
  ]
})
</script>

<template>
  <div class="root">
    <div class="container">
      <div class="title">{{ $t('kungalgame.privacy') }}</div>

      <I18nPrivacyContentEN v-if="locale === 'en-us'" />
      <I18nPrivacyContentJP v-if="locale === 'ja-jp'" />
      <I18nPrivacyContentCN v-if="locale === 'zh-cn'" />
      <I18nPrivacyContentTW v-if="locale === 'zh-tw'" />

      <KunFooter style="position: absolute; bottom: -100px" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.root {
  padding-top: 20px;
  height: calc(100vh - 75px);
  width: 100vw;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.container {
  width: 100%;
  max-width: 48rem;
  margin: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  @include kun-blur;

  &:hover {
    box-shadow: var(--kungalgame-shadow-1);
    transition: 0.3s;
  }
}

.article {
  padding: 20px;
}

.list > li {
  margin-bottom: 30px;
  list-style: inside;
}

.title {
  font-size: 30px;
  height: 77px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
}

.nav {
  display: flex;
  justify-content: space-between;
}

@media (max-width: 700px) {
  .root {
    height: calc(100vh - 63px);
  }

  .container {
    width: 90%;
  }
}
</style>
