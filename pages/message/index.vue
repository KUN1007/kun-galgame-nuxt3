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
    <div class="aside" />

    <div class="content"></div>
  </div>
</template>

<style lang="scss" scoped>
.content-container {
  border-radius: 7px;
  height: calc(100dvh - 75px);
  transition: width 0.2s;
  max-width: 64rem;
  margin: auto;
  display: flex;
}

.aside {
  height: 100%;
  color: var(--kungalgame-font-color-3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin-right: 17px;
  padding: 17px;

  @include kun-blur;
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
