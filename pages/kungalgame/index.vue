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
      <KungalgameContentEN v-if="locale === 'en-us'" />

      <KungalgameContentCN v-if="locale === 'zh-cn'" />

      <KunFooter style="padding-bottom: 20px" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content-container {
  border-radius: 7px;
  height: calc(100dvh - 75px);
  transition: width 0.2s;
  width: 100%;
  max-width: 64rem;
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

@media (max-width: 1000px) {
  .content-container {
    width: 90%;
    padding: 0;
  }
}

@media (max-width: 700px) {
  .content-container {
    width: 95%;
  }

  .aside {
    display: none;
  }
}
</style>
