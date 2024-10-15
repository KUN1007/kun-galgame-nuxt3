<script setup lang="ts">
const { t, locale } = useI18n()

useHead({
  title: `${t('seo.agreement.title')} - ${t('head.title')}`,
  meta: [
    {
      name: 'description',
      content: t('seo.agreement.description')
    }
  ]
})
</script>

<template>
  <div class="root">
    <div class="article">
      <div class="title">{{ t('seo.agreement.title') }}</div>

      <I18nAgreementContentEN v-if="locale === 'en-us'" />
      <I18nAgreementContentJP v-if="locale === 'ja-jp'" />
      <I18nAgreementContentCN v-if="locale === 'zh-cn'" />
      <I18nAgreementContentTW v-if="locale === 'zh-tw'" />

      <div class="nav">
        <KunBackToPrevious />
        <KunBackToHome />
      </div>
    </div>

    <KunFooter class="footer" />
  </div>
</template>

<style lang="scss" scoped>
.root {
  padding-top: 20px;
  height: calc(100vh - 75px);
  overflow-y: scroll;
  width: 100vw;
  display: flex;
  flex-direction: column;
}

.article {
  max-width: 600px;
  margin: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;

  @include kun-blur;

  &:hover {
    box-shadow: var(--kungalgame-shadow-1);
    transition: 0.3s;
  }
}

.title {
  height: 77px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  font-size: 30px;
}

.content {
  & > p {
    margin: 5px;

    &:nth-child(2) {
      margin-top: 20px;
    }

    &:last-child {
      margin: 50px 0;
      display: flex;
      justify-content: center;
    }
  }
}

.footer {
  width: 100%;
}

.nav {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

@media (max-width: 700px) {
  .article {
    width: 90%;
  }

  .root {
    height: calc(100dvh - 63px);
  }
}
</style>
