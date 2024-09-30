<script setup lang="ts">
const { t } = useI18n()

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
    <MessageAside />

    <div class="content"></div>
  </div>
</template>

<style lang="scss" scoped>
.content-container {
  border-radius: 10px;
  height: calc(100dvh - 75px);
  transition: width 0.2s;
  max-width: 64rem;
  margin: auto;
  display: flex;
}

.content {
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 0 30px;

  @include kun-blur;
}
</style>
