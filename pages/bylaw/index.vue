<script setup lang="ts">
const { t, locale } = useI18n()

useHead({
  title: t('seo.bylaw.title'),
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
  background-color: var(--kungalgame-trans-white-5);
  border-radius: 10px;
  backdrop-filter: blur(10px);
  box-shadow: var(--kungalgame-shadow-0);
  color: var(--kungalgame-font-color-3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
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
