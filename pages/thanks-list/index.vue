<script setup lang="ts">
const { t, locale } = useI18n()

useHead({
  title: t('seo.thanksList.title'),
  meta: [
    {
      name: 'description',
      content: t('seo.thanksList.description'),
    },
  ],
})
</script>

<template>
  <div class="root">
    <div class="container">
      <div class="title">{{ $t('kungalgame.thanks') }}</div>

      <ThanksListEN v-if="locale === 'en'" />

      <ThanksListCN v-if="locale === 'zh'" />

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
  transition: width 0.2s;
  width: 90%;
  max-width: 1300px;
  margin: 0 auto;
  position: relative;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--kungalgame-font-color-3);
  background-color: var(--kungalgame-trans-white-5);
  backdrop-filter: blur(17px);
  padding: 20px;
  box-shadow: var(--kungalgame-shadow-0);
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
  border-bottom: 1.5px solid var(--kungalgame-blue-4);
  cursor: pointer;

  a {
    color: var(--kungalgame-blue-4);
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
